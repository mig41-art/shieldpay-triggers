// server.js

require('dotenv').config();    // to load environment variables from a .env file
const express = require('express');
const cors = require('cors');
const simulateTriggers = require('./triggers');

const app = express();
app.use(cors());
app.use(express.json());

// POST /simulate
app.post('/simulate', (req, res) => {
  try {
    const { predicted_income, condition } = req.body;
    // Basic validation
    if (predicted_income === undefined) {
      return res.status(400).json({ success: false, error: "predicted_income is required" });
    }
    // Call the triggers logic
    const result = simulateTriggers(Number(predicted_income), condition);
    // Standardized response
    return res.json({
      success: true,
      data: {
        predicted_income: Number(predicted_income),
        actual_income: result.actual_income,
        condition: result.condition,
        impact_percentage: result.impact_percentage
      }
    });
  } catch (error) {
    // Return validation or simulation errors as JSON
    return res.status(400).json({ success: false, error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Triggers service running on http://localhost:${PORT}`);
});
