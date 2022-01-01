import express from 'express'
import { join, dirname } from 'path'
import hbs from 'express-hbs'
import morgan from 'morgan'
import http from 'http'
import { Server } from 'socket.io'
import { fileURLToPath } from 'url'

// Enviroment variables
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

// Routes
import homeRouter from './routes/homeRouter.js'
import payloadRouter from './routes/payloadRouter.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const fullDirName = dirname(fileURLToPath(import.meta.url))

// View setup
app.engine('hbs', hbs.express4({
  defaultLayout: join(fullDirName, 'views', 'layouts', 'default')
}))
app.set('view engine', 'hbs')
app.set('views', join(fullDirName, 'views'))

// Parse
app.use(express.urlencoded({ extended: false }))

app.use(express.json())

// Logger
app.use(morgan('dev'))

// Static files
app.use(express.static(join(fullDirName, 'public')))

// Socket.io
io.on('connection', socket => {
  console.log('SOCKET CONNECTED')

  socket.on('disconnect', () => {
    console.log('SOCKET DISCONNECTED')
  })
})

app.use((req, res, next) => {
  res.io = io

  next()
})

// Routes
app.use('/', homeRouter)
app.use('/payload', payloadRouter)

// Catch 404
app.use((req, res, next) => {
  res.status(404)
  res.sendFile(join(fullDirName, 'public', '404.html'))
})

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message || 'Internal Server Error')
})

server.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`))
