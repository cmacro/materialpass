# Task 5: Real-time Inventory Summary Report
**Phase: 4 - Inventory Analytics & Reporting**

## Description
Implement the final output of the system: the Real-time Inventory Summary.

## Requirements
- Implement aggregation logic:
  - `Total Inbound` = Sum of all quantities for a `product_id` in the Inbound Log.
  - `Total Outbound` = Sum of all quantities for a `product_id` in the Outbound Log.
  - `Ending Inventory` = `Total Inbound` - `Total Outbound`.
- Display a summary table showing: Name, Spec, Unit, Category, Total In, Total Out, Ending Inventory.

## Checklist
- [ ] Implement database query for calculating total inbound quantities per material.
- [ ] Implement database query for calculating total outbound quantities per material.
- [ ] Implement the final ending inventory calculation logic.
- [ ] Build the Summary Report UI to display the aggregated data.

## Acceptance Criteria
- The summary report reflects real-time data from the logs.
- Calculations for ending inventory are accurate.
