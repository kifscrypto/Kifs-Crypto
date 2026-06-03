const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function insertPost() {
  try {
    const result = await pool.query(
      `INSERT INTO posts (slug, title, excerpt, content, author, published_at, created_at, updated_at, featured_image, category)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING id, slug, title;`,
      [
        'kifs-scan-launch',
        '🚀 KIFS SCAN Is Live',
        'Meet KIFS SCAN - the blunt meme coin scanner for BASE and Solana. No fluff. Just verdicts.',
        `# 🚀 KIFS SCAN Is Live

We&apos;re excited to announce the official launch of **KIFS SCAN** - your go-to scanner for meme coins on BASE and Solana.

## What is KIFS SCAN?

KIFS SCAN is a real-time meme coin scanner that provides blunt verdicts on new token launches. No hype. No fluff. Just honest analysis to help you make informed decisions before you ape in.

### Features
- **Real-time Scanning** - Track new launches as they happen
- **Blunt Verdicts** - Clear, honest assessments of tokens
- **Multi-chain Support** - Scan both BASE and Solana networks
- **Token Reviews** - In-depth analysis and community insights

## Why KIFS SCAN?

In the meme coin space, speed and accuracy matter. KIFS SCAN cuts through the noise and gives you the information you need - fast.

Whether you&apos;re looking for the next big opportunity or just want to avoid rugs, KIFS SCAN has your back.

## Get Started

Head over to [KIFS SCAN](/) to start scanning tokens now.

---

**Disclaimer:** Not financial advice. DYOR. We just scan the bitch.`,
        'KIFS Team',
        new Date(),
        new Date(),
        new Date(),
        '/images/kifs-scan-launch.png',
        'announcement'
      ]
    );

    console.log('✅ Post created successfully:', result.rows[0]);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating post:', error);
    process.exit(1);
  }
}

insertPost();
