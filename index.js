// index.js

// Direct dependency
const express = require("express");

// Transitive dependencies
const debug = require("debug")("demo:server");
const ms = require("ms");

const app = express();
const PORT = 3000;

// Simple middleware with logging
app.use((req, res, next) => {
  debug(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Route that uses `ms` to format uptime
app.get("/", (req, res) => {
  const uptime = process.uptime(); // in seconds
  res.send(`Server uptime: ${ms(uptime * 1000)}`);
});

// Start server
app.listen(PORT, () => {
  debug(`Server is listening on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`);
});
