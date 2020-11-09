import { Router } from 'express'

import { schemaController } from '../controllers/schema-controller.js'
import { fileUploadMeddleware } from '../middlewares/multer-file-upload.js'

const routes = Router()

routes.get('/api/schemas/:schemaName', schemaController.get)
routes.get('/api/schemas', schemaController.list)
routes.post(
  '/api/schemas/process-file',
  fileUploadMeddleware.single('structure'),
  schemaController.fileUpload
)
routes.post('/api/schemas', schemaController.save)

export { routes as schemasRoutes }
