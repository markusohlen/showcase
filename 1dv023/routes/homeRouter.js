'use strict'

import express from 'express'
const router = express.Router()

import HomeController from '../controllers/HomeController.js'

const controller = new HomeController()

/**
 * Routes to home and validates each snippet creator
 */
router.get('/', controller.index)

export default router
