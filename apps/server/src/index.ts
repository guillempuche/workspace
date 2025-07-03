import fastifyCors from '@fastify/cors'
import fastifyWebsocket from '@fastify/websocket'
import { Logger } from '@hocuspocus/extension-logger'
import { SQLite } from '@hocuspocus/extension-sqlite'
import { Hocuspocus } from '@hocuspocus/server'
import fastify from 'fastify'

// Load environment variables
import 'dotenv/config'

const PORT = Number(process.env.PORT)

const hocuspocus = new Hocuspocus({
	extensions: [
		new Logger(),
		new SQLite({
			database: 'db.sqlite',
		}),
	],

	// Optional: Add authentication
	// async onAuthenticate(data) {
	//   // Validate token if needed
	//   // if (data.token !== 'valid-token') {
	//   //   throw new Error('Unauthorized')
	//   // }
	//
	//   // Return user context
	//   return {
	//     user: {
	//       id: '1',
	//       name: 'User',
	//     }
	//   }
	// },

	// Optional: Handle document loading
	// async onLoadDocument(data) {
	//   // Load initial content if document is empty
	//   if (data.document.isEmpty('default')) {
	//     // Initialize with default content
	//   }
	//   return data.document
	// },

	// Optional: Log events
	// async onConnect(data) {
	//   console.log(`Client connected to document: ${data.documentName}`)
	// },

	// async onDisconnect(data) {
	//   console.log(`Client disconnected from document: ${data.documentName}`)
	// },
})

// Environment-specific logger config
const envToLogger = {
	development: {
		transport: {
			target: 'pino-pretty',
			options: {
				translateTime: 'HH:MM:ss Z',
				ignore: 'pid,hostname',
			},
		},
	},
	production: true,
	test: false,
}

// Fastify server
const server = fastify({
	logger: envToLogger[process.env.NODE_ENV as keyof typeof envToLogger] ?? true,
})

// Register CORS
await server.register(fastifyCors, { origin: true })

// Register WebSocket plugin
await server.register(fastifyWebsocket)

server.get('/', async (request, reply) => {
	return { status: 'Hocuspocus server is running' }
})

server.get('/health', async (request, reply) => {
	return { status: 'ok', timestamp: new Date().toISOString() }
})

// WebSocket route for Hocuspocus
server.register(async fastify => {
	fastify.get('/collab', { websocket: true }, (socket, request) => {
		// Optional: Add context data
		const context = {
			// You can add user info, request headers, etc.
			requestHeaders: request.headers,
			// user: { id: '1', name: 'User' }
		}

		hocuspocus.handleConnection(socket, request.raw, context)
	})
})

const start = async () => {
	try {
		await server.listen({ port: PORT, host: '0.0.0.0' })
		console.log(`🚀 Server listening on http://localhost:${PORT}`)
		console.log(`📡 WebSocket endpoint: ws://localhost:${PORT}/`)
	} catch (err) {
		server.log.error(err)
		process.exit(1)
	}
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
	console.log('SIGTERM received, shutting down gracefully...')
	await server.close()
	process.exit(0)
})

process.on('SIGINT', async () => {
	console.log('SIGINT received, shutting down gracefully...')
	await server.close()
	process.exit(0)
})

start()
