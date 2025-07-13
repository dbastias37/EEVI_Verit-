-- Migration for new project management features

-- Add columns to projects
ALTER TABLE projects ADD COLUMN client_id INTEGER DEFAULT NULL;
ALTER TABLE projects ADD COLUMN status TEXT CHECK(status IN ('draft','active','closed','archived')) DEFAULT 'draft';
ALTER TABLE projects ADD COLUMN payment_validated INTEGER DEFAULT 0;
ALTER TABLE projects ADD COLUMN payment_code VARCHAR(100);
ALTER TABLE projects ADD COLUMN priority TEXT CHECK(priority IN ('low','normal','high')) DEFAULT 'normal';
ALTER TABLE projects ADD COLUMN estimated_delivery DATE;
ALTER TABLE projects ADD COLUMN created_at TIMESTAMP;
ALTER TABLE projects ADD COLUMN updated_at TIMESTAMP;

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  comment_text TEXT,
  comment_type TEXT,
  parent_comment_id INTEGER,
  is_resolved INTEGER DEFAULT 0,
  visibility TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  is_deleted INTEGER DEFAULT 0,
  FOREIGN KEY(project_id) REFERENCES projects(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

-- Payment attempts table
CREATE TABLE IF NOT EXISTS payment_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  attempted_code TEXT,
  success INTEGER DEFAULT 0,
  ip_address TEXT,
  user_agent TEXT,
  session_id TEXT,
  attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(project_id) REFERENCES projects(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_projects_client_status ON projects(client_id, status);
CREATE INDEX IF NOT EXISTS idx_comments_project_deleted ON comments(project_id, is_deleted);
CREATE INDEX IF NOT EXISTS idx_payment_attempts_ip_time ON payment_attempts(ip_address, attempted_at);
