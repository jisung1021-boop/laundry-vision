import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data directory: supports Render Persistent Disk via DATA_DIR environment variable
const DATA_DIR = process.env.DATA_DIR || __dirname;
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
const DB_PATH = path.join(DATA_DIR, 'database.sqlite');

let db = null;

// Initialize SQLite database
export async function initDb() {
  if (db) return db;

  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    try {
      const fileBuffer = fs.readFileSync(DB_PATH);
      db = new SQL.Database(fileBuffer);
    } catch (err) {
      console.warn('Failed to read existing database file, creating a new one:', err.message);
      db = new SQL.Database();
    }
  } else {
    db = new SQL.Database();
  }

  // Create table if not exists
  db.run(`
    CREATE TABLE IF NOT EXISTS history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_name TEXT,
      image_path TEXT,
      analysis_result TEXT,
      created_at TEXT,
      user_id TEXT DEFAULT 'guest'
    );
  `);

  saveToFile();
  return db;
}

// Persist the in-memory SQLite database to disk
function saveToFile() {
  if (!db) return;
  try {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  } catch (err) {
    console.error('Failed to persist SQLite database to disk:', err);
  }
}

// Get all history records sorted by newest first
export async function getAllHistory() {
  const database = await initDb();
  const stmt = database.prepare('SELECT * FROM history ORDER BY id DESC');
  const results = [];
  while (stmt.step()) {
    const row = stmt.getAsObject();
    try {
      row.analysis_result = JSON.parse(row.analysis_result);
    } catch (e) {
      // keep raw string if not JSON
    }
    results.push(row);
  }
  stmt.free();
  return results;
}

// Get single history item by ID
export async function getHistoryById(id) {
  const database = await initDb();
  const stmt = database.prepare('SELECT * FROM history WHERE id = :id');
  stmt.bind({ ':id': Number(id) });
  if (stmt.step()) {
    const row = stmt.getAsObject();
    try {
      row.analysis_result = JSON.parse(row.analysis_result);
    } catch (e) {
      // keep raw string if not JSON
    }
    stmt.free();
    return row;
  }
  stmt.free();
  return null;
}

// Save a new analysis history record
export async function saveHistory({ image_name, image_path, analysis_result, user_id = 'guest' }) {
  const database = await initDb();
  const createdAt = new Date().toISOString();
  const resultJson = typeof analysis_result === 'string' ? analysis_result : JSON.stringify(analysis_result);

  database.run(
    'INSERT INTO history (image_name, image_path, analysis_result, created_at, user_id) VALUES (?, ?, ?, ?, ?)',
    [image_name, image_path, resultJson, createdAt, user_id]
  );

  saveToFile();

  // Return the newly inserted record ID
  const stmt = database.prepare('SELECT last_insert_rowid() as id');
  let newId = null;
  if (stmt.step()) {
    newId = stmt.getAsObject().id;
  }
  stmt.free();

  return {
    id: newId,
    image_name,
    image_path,
    analysis_result: typeof analysis_result === 'string' ? JSON.parse(analysis_result) : analysis_result,
    created_at: createdAt,
    user_id
  };
}

// Delete history record by ID
export async function deleteHistory(id) {
  const database = await initDb();
  const existing = await getHistoryById(id);
  if (!existing) return false;

  database.run('DELETE FROM history WHERE id = ?', [Number(id)]);
  saveToFile();
  return existing;
}

// Clear all history records
export async function clearAllHistory() {
  const database = await initDb();
  database.run('DELETE FROM history');
  saveToFile();
  return true;
}
