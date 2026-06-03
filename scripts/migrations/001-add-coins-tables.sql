-- KIFS Scan: Core coins table
CREATE TABLE IF NOT EXISTS coins (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  symbol VARCHAR(50) NOT NULL,
  chain VARCHAR(50) NOT NULL, -- 'base' or 'solana'
  contract_address VARCHAR(255) NOT NULL,
  dex_screener_pair_id VARCHAR(255) UNIQUE,
  first_seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_coins_chain ON coins(chain);
CREATE INDEX IF NOT EXISTS idx_coins_created_at ON coins(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_coins_first_seen_at ON coins(first_seen_at DESC);

-- Time-series data snapshots for each coin
CREATE TABLE IF NOT EXISTS coin_data (
  id SERIAL PRIMARY KEY,
  coin_id INTEGER NOT NULL REFERENCES coins(id) ON DELETE CASCADE,
  price_usd DECIMAL(20, 8),
  market_cap_usd DECIMAL(20, 2),
  liquidity_usd DECIMAL(20, 2),
  liquidity_base_token DECIMAL(20, 8),
  volume_24h DECIMAL(20, 2),
  price_change_24h DECIMAL(10, 4), -- percentage
  holder_count INTEGER,
  tx_count_24h INTEGER,
  buy_count_24h INTEGER,
  sell_count_24h INTEGER,
  web_url VARCHAR(255),
  twitter_url VARCHAR(255),
  telegram_url VARCHAR(255),
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_coin_data_coin_id ON coin_data(coin_id);
CREATE INDEX IF NOT EXISTS idx_coin_data_recorded_at ON coin_data(recorded_at DESC);

-- Contract security checks
CREATE TABLE IF NOT EXISTS coin_checks (
  id SERIAL PRIMARY KEY,
  coin_id INTEGER NOT NULL UNIQUE REFERENCES coins(id) ON DELETE CASCADE,
  is_verified BOOLEAN DEFAULT FALSE,
  lp_burned BOOLEAN DEFAULT FALSE,
  lp_locked BOOLEAN DEFAULT FALSE,
  is_honeypot BOOLEAN DEFAULT FALSE,
  is_honeypot_token BOOLEAN DEFAULT FALSE,
  holder_concentration DECIMAL(5, 2), -- top 10 holder % concentration
  social_followers_twitter INTEGER,
  social_followers_telegram INTEGER,
  checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_coin_checks_coin_id ON coin_checks(coin_id);

-- KIFS verdicts and reviews
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  coin_id INTEGER NOT NULL UNIQUE REFERENCES coins(id) ON DELETE CASCADE,
  verdict VARCHAR(100), -- 'BUY THE BITCH', 'TREAD CAREFULLY', 'SMELLS LIKE A RUG', 'STAY THE F*** AWAY', NULL for pending
  
  -- Scoring (1-5 scale)
  contract_score INTEGER CHECK (contract_score >= 1 AND contract_score <= 5),
  liquidity_score INTEGER CHECK (liquidity_score >= 1 AND liquidity_score <= 5),
  holder_score INTEGER CHECK (holder_score >= 1 AND holder_score <= 5),
  social_score INTEGER CHECK (social_score >= 1 AND social_score <= 5),
  momentum_score INTEGER CHECK (momentum_score >= 1 AND momentum_score <= 5),
  
  overall_score DECIMAL(3, 1), -- 1.0 - 5.0
  notes TEXT,
  published BOOLEAN DEFAULT FALSE,
  reviewed_by VARCHAR(100),
  reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reviews_coin_id ON reviews(coin_id);
CREATE INDEX IF NOT EXISTS idx_reviews_published ON reviews(published);
CREATE INDEX IF NOT EXISTS idx_reviews_verdict ON reviews(verdict) WHERE published = TRUE;
