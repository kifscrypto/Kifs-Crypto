import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function setupDatabase() {
  try {
    console.log('[v0] Starting database setup...');

    // Create posts table
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        week INTEGER NOT NULL,
        exchange VARCHAR(100),
        balance DECIMAL(15, 2),
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('[v0] Posts table created');

    // Create journey_stats table
    await sql`
      CREATE TABLE IF NOT EXISTS journey_stats (
        id SERIAL PRIMARY KEY,
        starting_balance DECIMAL(15, 2) NOT NULL,
        current_balance DECIMAL(15, 2) NOT NULL,
        target_balance DECIMAL(15, 2) NOT NULL,
        current_exchange VARCHAR(100),
        week INTEGER NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('[v0] Journey stats table created');

    // Seed initial journey stats
    await sql`
      INSERT INTO journey_stats (starting_balance, current_balance, target_balance, current_exchange, week)
      VALUES (1000, 1247.50, 1000000, 'BYDFi', 1)
      ON CONFLICT DO NOTHING
    `;
    console.log('[v0] Journey stats seeded');

    // Seed first blog post
    await sql`
      INSERT INTO posts (slug, title, excerpt, content, week, exchange, balance, date)
      VALUES (
        'week-1-bydfi-the-challenge-begins',
        'Week 1: BYDFi — The Challenge Begins',
        '$1,000 in. BYDFi sign-up bonus claimed. Here''s exactly what I did, what the bonus got me, and where I stand after week one.',
        'Starting with $1,000 and diving into BYDFi. This week was about understanding the sign-up bonus structure, how to claim it, and executing the first trades. The goal is simple: use only exchange bonuses to reach $1,000,000. No additional deposits. Here''s the breakdown of what happened:\n\n## The Setup\n\nOpened a BYDFi account on Monday morning. The sign-up bonus was straightforward—$100 in trading credits after completing KYC verification and making a first deposit. But wait—I''m not allowed to deposit. The rules are strict: $1,000 starting capital only. So the strategy is to use every bonus the exchange offers and compound them.\n\n## The Trade\n\nAfter claiming the $100 bonus, I had $1,100 to work with. BYDFi was running a new trader promotion—an additional $50 if you make your first trade within 72 hours. So I bought $550 worth of BTC and $550 worth of ETH. Not the most aggressive, but sustainable.\n\n## The Results\n\nBTC went up 2.5%, ETH went up 3.2%. My portfolio is now at $1,247.50. That''s a 24.75% gain in week one, but most of it came from the sign-up bonuses, not trading skill. Still, it''s progress.\n\n## What''s Next\n\nWeek 2 will be about finding the next exchange with a good bonus and repeating the process. The compounding effect is what will carry this challenge forward.',
        1,
        'BYDFi',
        1247.50,
        NOW()
      )
      ON CONFLICT (slug) DO NOTHING
    `;
    console.log('[v0] First blog post seeded');

    console.log('[v0] Database setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('[v0] Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
