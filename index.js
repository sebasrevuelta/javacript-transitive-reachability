// index.js

// Direct dependency
const express = require("express");

// Transitive dependencies
const debug = require("debug")("demo:server");
const ms = require("ms");

// Transitive dependency via browserify-sign
const crypto = require("sha.js");

const app = express();
const PORT = 3000;

// Middleware with logging
app.use((req, res, next) => {
  debug(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Route: show server uptime
app.get("/", (req, res) => {
  const uptime = process.uptime(); // in seconds
  res.send(`Server uptime: ${ms(uptime * 1000)}`);
});

// Route: hash a query parameter using sha.js
app.get("/hash", (req, res) => {
  const text = req.query.text || "default-text";

  // sha.js usage: create hash, feed with update(), and digest
  const hash = crypto("sha256").update(text).digest("hex");

  res.send(`SHA-256("${text}") = ${hash}`);
});

// Start server
app.listen(PORT, () => {
  debug(`Server is listening on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`);
  console.log(`Try: http://localhost:${PORT}/hash?text=hello`);
});
