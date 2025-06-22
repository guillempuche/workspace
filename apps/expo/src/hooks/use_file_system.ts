import { useCallback, useEffect, useState } from 'react'

import { useLix } from './lix_context'

const FOLDER_PLACEHOLDER = '.is_folder'

export interface FileSystemItem {
	name: string
	type: 'file' | 'folder'
	path: string
}

export function useFileSystem(currentPath: string) {
	const { lix } = useLix()
	const [items, setItems] = useState<FileSystemItem[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const getItems = useCallback(async () => {
		if (!lix) return
		setIsLoading(true)
		setError(null)
		try {
			const allDbFiles = await lix.db
				.selectFrom('file')
				.select(['path'])
				.execute()
			const folderNames = new Set<string>()
			const files: { name: string; path: string }[] = []
			const prefix = currentPath === '/' ? '/' : `${currentPath}/`

			for (const dbFile of allDbFiles) {
				if (!dbFile.path.startsWith(prefix)) continue

				const childPath = dbFile.path.substring(prefix.length)
				const firstSlashIndex = childPath.indexOf('/')

				if (firstSlashIndex === -1) {
					if (childPath !== FOLDER_PLACEHOLDER) {
						files.push({ name: childPath, path: dbFile.path })
					}
				} else {
					const folderName = childPath.substring(0, firstSlashIndex)
					folderNames.add(folderName)
				}
			}

			const folderItems = Array.from(folderNames).map(name => ({
				name,
				type: 'folder' as const,
				path: `${currentPath === '/' ? '' : currentPath}/${name}`,
			}))

			const fileItems = files.map(file => ({
				name: file.name,
				type: 'file' as const,
				path: file.path,
			}))

			const allItems = [...folderItems, ...fileItems]
			allItems.sort((a, b) => {
				if (a.type !== b.type) return a.type === 'folder' ? -1 : 1
				return a.name.localeCompare(b.name)
			})
			setItems(allItems)
		} catch (e) {
			setError('Failed to fetch items.')
			console.error(e)
		} finally {
			setIsLoading(false)
		}
	}, [lix, currentPath])

	useEffect(() => {
		getItems()
	}, [getItems])

	const createFolder = async (name: string) => {
		if (!lix || !name) return
		const newPath = `${currentPath}/${name}/${FOLDER_PLACEHOLDER}`
		await lix.db
			.insertInto('file')
			.values({ path: newPath, data: new Uint8Array() })
			.execute()
		await getItems()
	}

	const createFile = async (name: string) => {
		if (!lix || !name) return
		const newPath = `${currentPath}/${name}`
		await lix.db
			.insertInto('file')
			.values({ path: newPath, data: new Uint8Array() })
			.execute()
		await getItems()
	}

	const deleteItem = async (item: FileSystemItem) => {
		if (!lix) return
		if (item.type === 'file') {
			await lix.db.deleteFrom('file').where('path', '=', item.path).execute()
		} else {
			// folder
			// Delete placeholder and all children
			await lix.db
				.deleteFrom('file')
				.where('path', '=', `${item.path}/${FOLDER_PLACEHOLDER}`)
				.execute()
			await lix.db
				.deleteFrom('file')
				.where('path', 'like', `${item.path}/%`)
				.execute()
		}
		await getItems()
	}

	const renameItem = async (item: FileSystemItem, newName: string) => {
		if (!lix || !newName) return
		const parentPath = item.path.substring(0, item.path.lastIndexOf('/'))
		const newPath = `${parentPath}/${newName}`

		if (item.type === 'file') {
			await lix.db
				.updateTable('file')
				.set({ path: newPath })
				.where('path', '=', item.path)
				.execute()
		} else {
			// folder
			const allChildren = await lix.db
				.selectFrom('file')
				.select(['path', 'id'])
				.where('path', 'like', `${item.path}/%`)
				.execute()
			const placeholder = await lix.db
				.selectFrom('file')
				.select(['path', 'id'])
				.where('path', '=', `${item.path}/${FOLDER_PLACEHOLDER}`)
				.executeTakeFirst()

			await lix.db.transaction().execute(async trx => {
				if (placeholder) {
					await trx
						.updateTable('file')
						.set({ path: `${newPath}/${FOLDER_PLACEHOLDER}` })
						.where('id', '=', placeholder.id)
						.execute()
				}
				for (const child of allChildren) {
					const updatedPath = child.path.replace(item.path, newPath)
					await trx
						.updateTable('file')
						.set({ path: updatedPath })
						.where('id', '=', child.id)
						.execute()
				}
			})
		}
		await getItems()
	}

	return {
		items,
		isLoading,
		error,
		getItems,
		createFolder,
		createFile,
		deleteItem,
		renameItem,
	}
}
