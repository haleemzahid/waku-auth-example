-- migrate:up

-- Create todos table for task management
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  completed INTEGER DEFAULT 0 CHECK (completed IN (0, 1)),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  due_date DATE,
  user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_todos_user_id ON todos(user_id);
CREATE INDEX idx_todos_completed ON todos(completed);
CREATE INDEX idx_todos_due_date ON todos(due_date);
CREATE INDEX idx_todos_priority ON todos(priority);

-- Insert some example todos
INSERT INTO todos (title, description, priority, user_id) VALUES 
  ('Learn SQL migrations', 'Practice creating and managing database migrations with dbmate', 'high', 'temp_user_1'),
  ('Build todo feature', 'Implement CRUD operations for the todos table', 'medium', 'temp_user_1'),
  ('Add authentication', 'Connect todos to the user authentication system', 'high', 'temp_user_1');

-- migrate:down

-- Drop indexes first
DROP INDEX IF EXISTS idx_todos_priority;
DROP INDEX IF EXISTS idx_todos_due_date;
DROP INDEX IF EXISTS idx_todos_completed;
DROP INDEX IF EXISTS idx_todos_user_id;

-- Drop the table
DROP TABLE IF EXISTS todos;

