import app from './app'

// Ensuring PORT is always a number and providing a default value
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`) // remove this for prod 
})