# Task 4: Inbound and Outbound Log Recording

**Phase: 3 - Material Movement Tracking**

## Description

Implement the recording system for material movements (inbound and outbound).

## Requirements

- **Inbound Log**: Interface to record arrival date and quantity. On entering `product_id`, automatically fetch and display material details from the Master Database.
- **Outbound Log**: Interface to record usage date and quantity. On entering `product_id`, automatically fetch and display material details from the Master Database.
- **Validation**: Enforce the "Define before use" rule: `product_id` must exist in the Material Master before recording a log.

## Checklist

- [ ] Implement Inbound log entry UI and API.
- [ ] Implement Outbound log entry UI and API.
- [ ] Integrate Master Database lookup to auto-fill material details upon `product_id` input.
- [ ] Implement validation to prevent logging `product_id`s that do not exist in the Master Database.

## Acceptance Criteria

- Material details are auto-filled upon entering a valid `product_id`.
- Error is shown if an undefined `product_id` is used.
- Logs are correctly stored in the database.
