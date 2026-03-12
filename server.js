import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import paletteRoutes from './src/routes/paletteRoutes.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true
}))
app.use(express.json())

// Routes
app.use('/api/palettes', paletteRoutes)

// Health check
app.get('/', (req, res) => {
  res.json({ message: '🎨 RangiCraft API is running' })
})

// Connect to MongoDB then start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err)
    process.exit(1)
  })