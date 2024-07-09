import express from 'express'
import { addPost, getPostById, getPosts, removePost, updatePost } from './post.controller.js'
// import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
// import {log} from '../../middlewares/logger.middleware.js'

export const postRoutes = express.Router()

postRoutes.get('/', getPosts)
postRoutes.get('/:postId', getPostById)
postRoutes.post('/', /*requireAuth,*/ addPost)
postRoutes.put('/', /*requireAuth,*/ updatePost)
postRoutes.delete('/:postId', /*requireAuth,*/ removePost)