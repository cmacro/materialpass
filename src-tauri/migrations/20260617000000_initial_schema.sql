-- Create Procurement Table
CREATE TABLE IF NOT EXISTS procurement (
    product_id TEXT PRIMARY KEY,
    project TEXT NOT NULL,
    specifications TEXT,
    expected_quantity REAL NOT NULL,
    cost REAL NOT NULL
);

-- Create Material Master Table
CREATE TABLE IF NOT EXISTS material_master (
    product_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    specifications TEXT,
    unit TEXT,
    category TEXT,
    FOREIGN KEY (product_id) REFERENCES procurement(product_id)
);

-- Create Inbound Log Table
CREATE TABLE IF NOT EXISTS inbound_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT NOT NULL,
    date TEXT NOT NULL,
    quantity REAL NOT NULL,
    FOREIGN KEY (product_id) REFERENCES material_master(product_id)
);

-- Create Outbound Log Table
CREATE TABLE IF NOT EXISTS outbound_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT NOT NULL,
    date TEXT NOT NULL,
    quantity REAL NOT NULL,
    FOREIGN KEY (product_id) REFERENCES material_master(product_id)
);
