import mongoose from 'mongoose'

const colorSchema = new mongoose.Schema({
  hex:  { type: String, required: true },
  role: { type: String, required: true },
})

const paletteSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  desc:      { type: String },
  colors:    { type: [colorSchema], required: true },
  insight:   { type: String },
  appType:   { type: String, required: true },
  market:    { type: String, required: true },
  mood:      { type: String, required: true },
  framework: { type: String },
  approach:  { type: String },
}, { timestamps: true })

export default mongoose.model('Palette', paletteSchema)