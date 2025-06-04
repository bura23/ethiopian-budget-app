const fs = require('fs').promises;
const path = require('path');
const pool = require('./database');

async function initializeDatabase() {
  try {
    // Read SQL file
    const sqlFile = await fs.readFile(path.join(__dirname, 'init.sql'), 'utf8');
    
    // Split SQL file into individual statements
    const statements = sqlFile
      .split(';')
      .filter(statement => statement.trim().length > 0);

    // Execute each statement
    for (const statement of statements) {
      await pool.query(statement);
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

// Run initialization
initializeDatabase(); 