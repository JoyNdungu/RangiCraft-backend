import express from 'express'
import {
  savePalette,
  getPalettes,
  getPaletteById,
  deletePalette,
} from '../controllers/paletteController.js'

const router = express.Router()

router.post('/',        savePalette)
router.get('/',         getPalettes)
router.get('/:id',      getPaletteById)
router.delete('/:id',   deletePalette)

export default router