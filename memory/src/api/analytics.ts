import express from 'express'

const router = express.Router()

// TODO: Implement analytics and metrics
router.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Analytics API - Coming soon',
    data: []
  })
})

export default router
