CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO categories (name, slug, description) VALUES
('Weekly Updates', 'weekly-updates', 'Weekly journey posts documenting the $1K challenge progress'),
('Bonus Guides', 'bonus-guides', 'Step-by-step guides on how to claim and maximise exchange bonuses');

ALTER TABLE posts ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES categories(id);
