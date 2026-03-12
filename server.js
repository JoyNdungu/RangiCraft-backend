import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import paletteRoutes from './src/routes/paletteRoutes.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5174',
    'http://localhost:5173',
    'https://rangi-craft-frontend.vercel.app',
  ],
  credentials: true
}))
app.use(express.json())

// ── Cached connection for serverless ──
let isConnected = false

async function connectDB() {
  if (isConnected) return
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
    })
    isConnected = true
    console.log('✅ MongoDB connected')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err)
    throw err
  }
}

// Connect before every request
app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database connection failed' })
  }
})

// Routes
app.use('/api/palettes', paletteRoutes)

// Health check
app.get('/', (req, res) => {
  res.json({ message: '🎨 RangiCraft API is running' })
})

export default app