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
    'https://rangicraft-frontend.vercel.app',
  ],
  credentials: true
}))
app.use(express.json())

// Routes
app.use('/api/palettes', paletteRoutes)

// Health check
app.get('/', (req, res) => {
  res.json({ message: '🎨 RangiCraft API is running' })
})

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err))

export default app