const express = require('express')
const path = require('path')
const app = express()
const serverless = require('serverless-http')

const PORT = process.env.PORT || 5000


// For API routes only
app.get('/api/version', (req, res) => {
  res.send('1')
})

if (process.env.NODE_ENV === 'production') {
  // Production (Netlify)
  // Don't try to serve static files from the function
  // Netlify will handle static files from the dist directory automatically
  module.exports.handler = serverless(app)
} else {
  // Development
  const PORT = process.env.PORT || 5000
  
  // Serve static files only in development
  app.use(express.static('dist'))
  
  // Handle React routing in development
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'))
  })
  
  app.listen(PORT, () => console.log(`Server running on port ${PORT}: http://localhost:${PORT}/`))
}