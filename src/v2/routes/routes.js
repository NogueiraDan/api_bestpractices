// In src/v1/routes/routes.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`<h2>Initial Route from ${req.baseUrl}. This is a Beta API in moment</h2>`);
});


module.exports = router;