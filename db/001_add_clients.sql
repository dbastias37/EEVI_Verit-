BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE projects ADD COLUMN client_id INTEGER;
INSERT INTO clients (username, email)
SELECT DISTINCT substr(client_email, 1, instr(client_email,'@')-1), client_email
FROM projects
WHERE client_email IS NOT NULL AND client_email != '';
UPDATE projects
SET client_id = (
    SELECT id FROM clients WHERE email = projects.client_email
)
WHERE client_email IS NOT NULL AND client_email != '';
ALTER TABLE projects DROP COLUMN client_email;
COMMIT;
