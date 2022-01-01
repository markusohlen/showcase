'use strict'

import express from 'express'
const router = express.Router()

import PayloadController from '../controllers/PayloadController.js'

const controller = new PayloadController()

/**
 * Routes to payload and validates each snippet creator
 */
router.post('/', controller.validatePayload, controller.index)

router.post('/addComment', controller.addComment)

router.patch('/', controller.closeIssue)

export default router
