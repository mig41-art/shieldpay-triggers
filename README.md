# ShieldPay – Triggers Module

## Overview
This module simulates real world disruptions (for example: rain, low demand, no orders) and generates actual income for gig workers. It is part of the ShieldPay AI powered parametric insurance platform.

## Role in System
This module acts as the **Trigger Engine** in the overall workflow:

ML → predicted_income  
Triggers → actual_income  
Integration → claim + payout  
UI → display  

## Features
- Simulates real-world conditions:
  - Heavy Rain
  - Low Demand
  - No Orders
- Generates `actual_income` based on `predicted_income`
- Provides structured API response for integration

## API Endpoint

### POST /simulate

#### Request Body
```json
{
  "predicted_income": 1000,
  "condition": "heavy_rain"
}
