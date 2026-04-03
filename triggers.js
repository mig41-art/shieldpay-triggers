// triggers.js

/**
 * Simulates an external disruption and calculates actual income.
 * @param {number} predicted_income - The expected income from ML model.
 * @param {string} [selectedCondition] - (Optional) Force a specific condition for manual testing.
 * @returns {object} - { condition, actual_income, impact_percentage }
 * @throws {Error} - If input is invalid.
 */
function simulateTriggers(predicted_income, selectedCondition = null) {
  // Input validation
  if (typeof predicted_income !== 'number' || isNaN(predicted_income) || predicted_income < 0) {
    throw new Error("Invalid predicted_income: must be a non-negative number");
  }

  // Define possible conditions and their impact (as reduction percentages)
  const conditions = {
    normal: 0,          // 0% reduction
    light_rain: 0.10,   // 10% reduction
    heavy_rain: 0.30,   // 30% reduction
    low_demand: 0.40,   // 40% reduction
    no_orders: 0.80     // 80% reduction (e.g., app outage)
  };

  // Determine the condition to apply
  let condition;
  if (selectedCondition && conditions[selectedCondition] !== undefined) {
    // Use provided condition (manual mode)
    condition = selectedCondition;
  } else if (selectedCondition) {
    // Provided condition is invalid
    throw new Error(`Unknown condition: ${selectedCondition}`);
  } else {
    // Auto mode: randomly pick one of the keys
    const keys = Object.keys(conditions);
    condition = keys[Math.floor(Math.random() * keys.length)];
  }

  // Calculate actual income after applying the impact
  const impact = conditions[condition];
  const actual_income = predicted_income * (1 - impact);

  return {
    condition,
    actual_income: Math.round(actual_income),        
    impact_percentage: impact * 100                 
  };
}

module.exports = simulateTriggers;
