use tauri::{State};
use crate::db::DbState;
use crate::types::{ProcurementItem};

#[tauri::command]
#[specta::specta]
pub async fn get_procurement_items(state: State<'_, DbState>) -> Result<Vec<ProcurementItem>, String> {
    let pool = &state.pool;
    let items = sqlx::query_as::<_, ProcurementItem>(
        "SELECT product_id, project, specifications, expected_quantity, cost FROM procurement"
    )
    .fetch_all(pool.as_ref())
    .await
    .map_err(|e| e.to_string())?;

    Ok(items)
}

#[tauri::command]
#[specta::specta]
pub async fn create_procurement_item(
    state: State<'_, DbState>,
    item: ProcurementItem
) -> Result<(), String> {
    let pool = &state.pool;
    
    if item.product_id.is_empty() {
        return Err("Product ID cannot be empty".to_string());
    }

    sqlx::query(
        "INSERT INTO procurement (product_id, project, specifications, expected_quantity, cost) VALUES (?, ?, ?, ?, ?)"
    )
    .bind(&item.product_id)
    .bind(&item.project)
    .bind(&item.specifications)
    .bind(item.expected_quantity)
    .bind(item.cost)
    .execute(pool.as_ref())
    .await
    .map_err(|e| {
        if e.as_database_error().map(|de| de.is_unique_violation()).unwrap_or(false) {
            "Product ID already exists".to_string()
        } else {
            e.to_string()
        }
    })?;

    Ok(())
}

#[tauri::command]
#[specta::specta]
pub async fn update_procurement_item(
    state: State<'_, DbState>,
    item: ProcurementItem
) -> Result<(), String> {
    let pool = &state.pool;

    sqlx::query(
        "UPDATE procurement SET project = ?, specifications = ?, expected_quantity = ?, cost = ? WHERE product_id = ?"
    )
    .bind(&item.project)
    .bind(&item.specifications)
    .bind(item.expected_quantity)
    .bind(item.cost)
    .bind(&item.product_id)
    .execute(pool.as_ref())
    .await
    .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
#[specta::specta]
pub async fn delete_procurement_item(
    state: State<'_, DbState>,
    product_id: String
) -> Result<(), String> {
    let pool = &state.pool;

    sqlx::query(
        "DELETE FROM procurement WHERE product_id = ?"
    )
    .bind(product_id)
    .execute(pool.as_ref())
    .await
    .map_err(|e| e.to_string())?;

    Ok(())
}
