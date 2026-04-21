import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

async function setupDatabase() {
  console.log('[v0] Starting database setup...');

  try {
    // Create posts table
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        exchange VARCHAR(100) NOT NULL,
        balance DECIMAL(15, 2) NOT NULL,
        week INTEGER NOT NULL,
        date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('[v0] Posts table created/verified');

    // Create journey_stats table
    await sql`
      CREATE TABLE IF NOT EXISTS journey_stats (
        id SERIAL PRIMARY KEY,
        starting_balance DECIMAL(15, 2) NOT NULL,
        current_balance DECIMAL(15, 2) NOT NULL,
        target_balance DECIMAL(15, 2) NOT NULL,
        current_exchange VARCHAR(100) NOT NULL,
        week INTEGER NOT NULL,
        percent_gain DECIMAL(10, 4) NOT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('[v0] Journey stats table created/verified');

    // Insert seed data if tables are empty
    const postsCount = await sql`SELECT COUNT(*) as count FROM posts`;
    if (postsCount[0].count === 0) {
      await sql`
        INSERT INTO posts (slug, title, excerpt, content, exchange, balance, week, date)
        VALUES (
          'week-1-bydfi-the-challenge-begins',
          'Week 1: BYDFi — The Challenge Begins',
          '$1,000 in. BYDFi sign-up bonus claimed. Here''s exactly what I did, what the bonus got me, and where I stand after week one.',
          'This is the beginning of the journey. I''ve started with my initial $1,000 and claimed the BYDFi sign-up bonus. Over the course of this week, I documented every trade, every decision, and every lesson learned. The bonus structure was generous, but the real test begins now — can I turn these incentives into compound gains? Stay tuned for weekly updates as I push toward the $1,000,000 target.',
          'BYDFi',
          1247.50,
          1,
          NOW()
        )
      `;
      console.log('[v0] Seed post inserted');
    }

    const statsCount = await sql`SELECT COUNT(*) as count FROM journey_stats`;
    if (statsCount[0].count === 0) {
      await sql`
        INSERT INTO journey_stats (starting_balance, current_balance, target_balance, current_exchange, week, percent_gain)
        VALUES (1000.00, 1247.50, 1000000.00, 'BYDFi', 1, 24.75)
      `;
      console.log('[v0] Seed journey stats inserted');
    }

    console.log('[v0] Database setup completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('[v0] Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
