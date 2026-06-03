#!/usr/bin/env node

const { sql } = require('@vercel/postgres');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  try {
    console.log('[v0] Reading migration file...');
    const migrationPath = path.join(__dirname, 'migrations', '001-add-coins-tables.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

    console.log('[v0] Executing migration...');
    
    // Split by semicolon to execute each statement separately
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    for (const statement of statements) {
      console.log('[v0] Executing:', statement.substring(0, 50) + '...');
      await sql.query(statement);
    }

    console.log('[v0] ✓ Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('[v0] Migration failed:', error.message);
    process.exit(1);
  }
}

runMigration();
