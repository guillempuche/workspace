// import {
// 	createAccount,
// 	type Lix,
// 	// type LixAccount,
// 	openLixInMemory,
// } from '@lix-js/sdk'
// import {
// 	createContext,
// 	type ReactNode,
// 	useContext,
// 	useEffect,
// 	useState,
// } from 'react'

// interface LixContextType {
// 	lix: Lix | null
// 	isLoading: boolean
// 	// user: LixAccount | null
// }

// const LixContext = createContext<LixContextType | undefined>(undefined)

// const ORG_ID = 'org_a'
// const USER_ID = 'user1'

// export function LixProvider({ children }: { children: ReactNode }) {
// 	const [lix, setLix] = useState<Lix | null>(null)
// 	// const [user, setUser] = useState<LixAccount | null>(null)
// 	const [isLoading, setIsLoading] = useState(true)

// 	useEffect(() => {
// 		async function initializeLix() {
// 			try {
// 				console.log('Initializing Lix...')
// 				const lixInstance = await openLixInMemory({})

// 				// Create a default user account for the session
// 				const defaultUser = await createAccount({
// 					lix: lixInstance,
// 					name: USER_ID,
// 				})

// 				// Switch to this account
// 				await lixInstance.db.transaction().execute(async trx => {
// 					await trx.deleteFrom('active_account').execute()
// 					await trx
// 						.insertInto('active_account')
// 						.values({ id: defaultUser.id, name: defaultUser.name })
// 						.execute()
// 				})

// 				console.log('Lix initialized for user:', defaultUser.name)
// 				setLix(lixInstance)
// 				// setUser(defaultUser)
// 			} catch (error) {
// 				console.error('Failed to initialize Lix:', error)
// 			} finally {
// 				setIsLoading(false)
// 			}
// 		}
// 		initializeLix()

// 		// Note: No cleanup function to close Lix, as it's in-memory for the app's lifetime.
// 		// In a real app, you might save to disk on backgrounding.
// 	}, [])

// 	const value = {
// 		lix,
// 		// user,
// 		isLoading,
// 	}

// 	return <LixContext.Provider value={value}>{children}</LixContext.Provider>
// }

// export function useLix() {
// 	const context = useContext(LixContext)
// 	if (context === undefined) {
// 		throw new Error('useLix must be used within a LixProvider')
// 	}
// 	return context
// }
