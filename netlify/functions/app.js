const express = require('express')
const path = require('path')
const app = express()
const serverless = require('serverless-http')

const PORT = process.env.PORT || 5000

// Serve static files
app.use(express.static('dist'))

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.get('/version', (req, res) => {
  res.send('1') // change this string to ensure a new version deployed
})

if (process.env.NODE_ENV === 'production') {
  // Production (Netlify)
  module.exports.handler = serverless(app)
} else {
  // Development
  app.listen(PORT, () => console.log(`Server running on port ${PORT}: http://localhost:${PORT}/`))
}
