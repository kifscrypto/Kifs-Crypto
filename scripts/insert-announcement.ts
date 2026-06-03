import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

async function insertAnnouncement() {
  console.log('[v0] Inserting announcement post...');

  try {
    const result = await sql`
      INSERT INTO posts (
        slug,
        title,
        excerpt,
        content,
        exchange,
        balance,
        week,
        date,
        image_url,
        published,
        meta_title,
        meta_description
      )
      VALUES (
        'kifscrypto-is-now-kifs-scan',
        'The challenge is over. KIFS Scan is live.',
        'From the $1k challenge to meme coin scanner — here''s what changed and why.',
        $1$We started the $1,000 to $1,000,000 challenge with good intentions. Document every trade, every exchange bonus, every move. Real money, real results.

But something more useful came along.

While we were running the challenge, we kept getting asked the same thing: "Is this coin legit?" Every day, people were aping into meme coins with no idea whether the contract was clean, whether the LP was burned, whether the dev wallet was about to dump on them.

Nobody was giving a straight answer. Every scanner tool gives you the data — LP locked, holders, volume — but nobody was actually saying "buy this" or "stay the fuck away."

So we built that.

KIFS Scan is a live meme coin scanner covering BASE and Solana. Every new launch gets pulled in automatically. Every coin that gains traction gets a verdict — blunt, honest, no dressing it up.

Four verdicts. That's it:
- BUY THE BITCH — contract clean, momentum real, worth a play
- TREAD CAREFULLY — mixed signals, proceed with size discipline
- SMELLS LIKE A RUG — multiple red flags, avoid
- STAY THE F*** AWAY — don't touch this under any circumstances

The challenge was a diary. This is a tool.

If you found us through the BYDFi or Bitunix posts — the exchange reviews and bonus guides live at Trading365.org. That's where we do the proper deep dives.

KIFS Scan is for before you ape in.$1$,
        NULL,
        NULL,
        NULL,
        true,
        'KIFS Scan Is Live — The Pivot From The Challenge',
        'KIFS Crypto pivoted from the $1k challenge to KIFS Scan, a live meme coin scanner for BASE and Solana with blunt verdicts.'
      )
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        excerpt = EXCLUDED.excerpt,
        content = EXCLUDED.content,
        published = EXCLUDED.published,
        meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description,
        updated_at = NOW()
      RETURNING *
    `;

    console.log('[v0] Announcement post inserted successfully:', result[0].slug);
    process.exit(0);
  } catch (error) {
    console.error('[v0] Failed to insert announcement:', error);
    process.exit(1);
  }
}

insertAnnouncement();
