import express from 'express'

const app = express()

const PORT = 3000

app.get('/', (req, res) => {
  res.send('Hello from Node.js server!')
})

app.get("/about", (req, res) => { res.send("This is the About route"); });

app.get("/api/interns", (req, res) => { res.json({ interns: ["Ali", "Sara", "Bilal"] }); });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})