# Task 6: System Integration and Final Validation

**Phase: 5 - Quality Assurance & Integration**

## Description

Perform end-to-end testing and validation of the data flow and business rules.

## Requirements

- Verify "Vertical Sync": Procurement $\rightarrow$ Master $\rightarrow$ Logs.
- Verify "Horizontal Stats": Logs $\rightarrow$ Summary.
- Validate "Uniqueness Principle": Ensure no duplicate `product_id` for different materials.
- Run comprehensive tests for the entire workflow defined in `docs/业务说明.md`.

## Checklist

- [ ] Test full workflow: Create Procurement item $\rightarrow$ Verify Master sync $\rightarrow$ Record Inbound $\rightarrow$ Verify Summary.
- [ ] Test full workflow: Record Outbound $\rightarrow$ Verify Summary update.
- [ ] Verify that updating a Procurement item propagates to existing logs' descriptions (via Master DB).
- [ ] Validate that duplicate `product_id` entries are blocked.
- [ ] Run `npm run check:all` to ensure code quality.

## Acceptance Criteria

- The entire business loop (Procurement $\rightarrow$ Master $\rightarrow$ In/Out $\rightarrow$ Summary) works without errors.
- Business constraints (unique IDs, define-before-use) are strictly enforced.
