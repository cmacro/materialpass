use sqlx::SqlitePool;
use std::sync::Arc;
use tokio::sync::Mutex;

#[derive(Clone)]
pub struct DbState {
    pub pool: Arc<SqlitePool>,
}

impl DbState {
    pub async fn new(database_url: &str) -> Result<Self, sqlx::Error> {
        let pool = SqlitePool::connect(database_url).await?;
        
        // Run migrations
        sqlx::migrate!("./migrations").run(&pool).await?;
        
        Ok(Self {
            pool: Arc::new(pool),
        })
    }
}
