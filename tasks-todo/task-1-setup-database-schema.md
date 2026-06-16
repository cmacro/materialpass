# Task 1: Database Schema Design
**Phase: 1 - Foundation & Data Architecture**

## Description
Define the data models for the Material Pass system based on the business specifications.

## Requirements
- **Procurement Table**: `product_id` (PK), `project`, `specifications`, `expected_quantity`, `cost`.
- **Material Master Table**: `product_id` (PK), `name`, `specifications`, `unit`, `category`.
- **Inbound Log Table**: `id` (PK), `product_id` (FK), `date`, `quantity`.
- **Outbound Log Table**: `id` (PK), `product_id` (FK), `date`, `quantity`.
- **Inventory Summary**: A view or calculated table deriving `total_in`, `total_out`, and `ending_inventory` based on `product_id`.

## Checklist
- [ ] Define Procurement table schema.
- [ ] Define Material Master table schema.
- [ ] Define Inbound/Outbound log schemas.
- [ ] Create migrations or scripts to apply the schema.
- [ ] Verify foreign key relationships between logs and the master table.

## Acceptance Criteria
- Database schema is designed and implemented.
- Foreign key relationships are correctly established between logs and the master table.
- All fields mentioned in `docs/业务说明.md` are covered.
