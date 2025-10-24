-- Create tables for ExportAIdor MVP

-- Table for tariff measures and trade data
CREATE TABLE IF NOT EXISTS trade_measures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    hs_code TEXT NOT NULL,
    country_origin TEXT NOT NULL,
    country_destination TEXT NOT NULL,
    tariff_rate TEXT NOT NULL,
    non_tariff_measures TEXT,
    required_documents TEXT,
    notes TEXT,
    confidence_level TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table for query logging
CREATE TABLE IF NOT EXISTS query_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_description TEXT NOT NULL,
    country_origin TEXT NOT NULL,
    country_destination TEXT NOT NULL,
    hs_code_result TEXT,
    confidence REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_hs_code ON trade_measures(hs_code);
CREATE INDEX IF NOT EXISTS idx_destination ON trade_measures(country_destination);
CREATE INDEX IF NOT EXISTS idx_hs_destination ON trade_measures(hs_code, country_destination);
