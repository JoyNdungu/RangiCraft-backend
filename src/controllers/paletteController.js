import Palette from '../models/Palette.js'

// Save a palette
export const savePalette = async (req, res) => {
  try {
    const palette = new Palette(req.body)
    const saved = await palette.save()
    res.status(201).json({ success: true, data: saved })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

// Get all palettes
export const getPalettes = async (req, res) => {
  try {
    const palettes = await Palette.find().sort({ createdAt: -1 })
    res.status(200).json({ success: true, data: palettes })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// Get single palette
export const getPaletteById = async (req, res) => {
  try {
    const palette = await Palette.findById(req.params.id)
    if (!palette) {
      return res.status(404).json({ success: false, message: 'Palette not found' })
    }
    res.status(200).json({ success: true, data: palette })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// Delete a palette
export const deletePalette = async (req, res) => {
  try {
    const palette = await Palette.findByIdAndDelete(req.params.id)
    if (!palette) {
      return res.status(404).json({ success: false, message: 'Palette not found' })
    }
    res.status(200).json({ success: true, message: 'Palette deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}