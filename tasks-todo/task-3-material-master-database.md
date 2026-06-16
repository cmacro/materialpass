# Task 3: Material Master Database Sync
**Phase: 2 - Material Definition & Synchronization**

## Description
Implement the Material Master Database which acts as the "standard dictionary" for the system.

## Requirements
- Implement a mechanism to automatically sync material details from the Procurement Plan to the Material Master table.
- Ensure that updates to specifications in the Procurement Plan propagate to the Master Database (Vertical Synchronization).
- Implement a lookup mechanism where `product_id` retrieves all associated material details.

## Checklist
- [ ] Implement synchronization logic (Procurement $\rightarrow$ Master).
- [ ] Implement a trigger or service to propagate updates from Procurement to Master.
- [ ] Build a lookup API/service to fetch material details by `product_id`.
- [ ] Verify that editing a procurement item automatically updates the corresponding master record.

## Acceptance Criteria
- New materials in the procurement plan are automatically added to the master database.
- Changes in the procurement plan are reflected in the master database.
