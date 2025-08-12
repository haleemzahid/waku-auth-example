# Database Migrations with Dbmate

This project uses [Dbmate](https://github.com/amacneil/dbmate) for database migrations. Dbmate is a simple, database-agnostic migration tool that uses plain SQL files.

## Quick Start

### Available Commands

```bash
# Apply all pending migrations
pnpm migrate

# Create a new migration file
pnpm migrate:new "create_posts_table"

# Rollback the last migration
pnpm migrate:rollback

# Show migration status
pnpm migrate:status

# Reset database (drop all tables and re-apply migrations)
pnpm migrate:reset
```

## Migration File Structure

Migration files are located in `db/migrations/` and follow this naming pattern:
```
20250812115505_initial_auth_schema.sql
```

Each migration file has two sections:

```sql
-- migrate:up
-- SQL statements to apply the migration
CREATE TABLE posts (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  user_id TEXT NOT NULL REFERENCES user(id),
  created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- migrate:down  
-- SQL statements to rollback the migration
DROP TABLE IF EXISTS posts;
```

## Student Workflow

### 1. Creating Your First Migration

```bash
# Create a new migration
pnpm migrate:new "create_posts_table"
```

This creates a file like `db/migrations/20250812120000_create_posts_table.sql`

### 2. Writing the Migration

Edit the generated file:

```sql
-- migrate:up
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT,
  slug TEXT UNIQUE,
  published INTEGER DEFAULT 0,
  user_id TEXT NOT NULL REFERENCES user(id),
  created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_published ON posts(published);

-- migrate:down
DROP INDEX IF EXISTS idx_posts_published;
DROP INDEX IF EXISTS idx_posts_user_id;
DROP TABLE IF EXISTS posts;
```

### 3. Applying the Migration

```bash
# Apply your migration
pnpm migrate

# Check status
pnpm migrate:status
```

### 4. If You Made a Mistake

```bash
# Rollback the last migration
pnpm migrate:rollback

# Edit the migration file
# Re-apply the migration
pnpm migrate
```

## Common Migration Examples

### Adding a New Table

```sql
-- migrate:up
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add some initial data
INSERT INTO categories (name, description) VALUES 
  ('Technology', 'Tech-related posts'),
  ('Lifestyle', 'Lifestyle content'),
  ('Education', 'Educational content');

-- migrate:down
DROP TABLE IF EXISTS categories;
```

### Adding a Column to Existing Table

```sql
-- migrate:up
ALTER TABLE posts ADD COLUMN category_id INTEGER REFERENCES categories(id);

-- migrate:down
-- SQLite doesn't support DROP COLUMN directly
-- You would need to recreate the table without the column
-- For learning purposes, we'll leave a comment:
-- Cannot easily rollback ADD COLUMN in SQLite
```

### Creating a Junction Table (Many-to-Many)

```sql
-- migrate:up
CREATE TABLE post_tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(post_id, tag_id)
);

CREATE INDEX idx_post_tags_post_id ON post_tags(post_id);
CREATE INDEX idx_post_tags_tag_id ON post_tags(tag_id);

-- migrate:down
DROP INDEX IF EXISTS idx_post_tags_tag_id;
DROP INDEX IF EXISTS idx_post_tags_post_id;
DROP TABLE IF EXISTS post_tags;
```

### Adding Constraints and Indexes

```sql
-- migrate:up
-- Add a check constraint
CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES user(id),
  created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_rating ON comments(rating);

-- migrate:down
DROP INDEX IF EXISTS idx_comments_rating;
DROP INDEX IF EXISTS idx_comments_user_id;
DROP INDEX IF EXISTS idx_comments_post_id;
DROP TABLE IF EXISTS comments;
```

## SQLite Best Practices

### 1. Use AUTOINCREMENT for Primary Keys
```sql
-- Good
id INTEGER PRIMARY KEY AUTOINCREMENT

-- Also good (simpler)
id INTEGER PRIMARY KEY
```

### 2. Always Include Timestamps
```sql
created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
```

### 3. Use Foreign Key Constraints
```sql
user_id TEXT NOT NULL REFERENCES user(id)
-- With cascade delete
post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE
```

### 4. Add Indexes for Performance
```sql
-- For columns you'll query frequently
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at);
```

### 5. Use Check Constraints for Data Validation
```sql
published INTEGER CHECK (published IN (0, 1)),
rating INTEGER CHECK (rating >= 1 AND rating <= 5)
```

## Troubleshooting

### Migration Failed?
```bash
# Check what went wrong
pnpm migrate:status

# If the migration is partially applied, you might need to:
# 1. Fix the SQL in the migration file
# 2. Manually fix the database, or
# 3. Reset and start over
pnpm migrate:reset
```

### Need to Reset Everything?
```bash
# This will drop the database and re-apply all migrations
pnpm migrate:reset
```

### Check Migration Status
```bash
# See which migrations have been applied
pnpm migrate:status
```

## Working with Your Team

### 1. Always Create Migrations for Schema Changes
- Never edit the database directly
- Always create a migration file
- Commit migration files to git

### 2. Migration File Naming
Use descriptive names:
- ✅ `create_posts_table`
- ✅ `add_category_to_posts`
- ✅ `create_user_profiles`
- ❌ `fix_stuff`
- ❌ `update_db`

### 3. Never Edit Applied Migrations
- Once a migration is applied (especially in production), never edit it
- Create a new migration to make changes
- Use the `migrate:rollback` command to undo recent changes during development

## Database Schema

The project starts with these auth-related tables created by the initial migration:

- **user**: User accounts and profiles
- **session**: User login sessions  
- **account**: Authentication provider accounts
- **verification**: Email verification tokens

You can build your application features on top of this foundation.

## Example Student Project Structure

Here's how a student might structure their migrations for a blog application:

```
db/migrations/
├── 20250812115505_initial_auth_schema.sql     # Already created
├── 20250812120001_create_categories.sql       # Categories for posts
├── 20250812120002_create_posts.sql           # Blog posts
├── 20250812120003_add_category_to_posts.sql   # Link posts to categories
├── 20250812120004_create_tags.sql            # Tags system
├── 20250812120005_create_post_tags.sql       # Many-to-many for post tags
├── 20250812120006_create_comments.sql        # Comments on posts
└── 20250812120007_add_post_views_counter.sql # Track post views
```

## Learning Resources

- [Dbmate Documentation](https://github.com/amacneil/dbmate)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [SQL Tutorial](https://www.w3schools.com/sql/)

## Need Help?

1. Check the migration status: `pnpm migrate:status`
2. Look at existing migration files for examples
3. Test your SQL in a SQLite browser first
4. Remember: you can always rollback and try again during development!
