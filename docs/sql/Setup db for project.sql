-- Install postgresql 14:
-- OSX: https://formulae.brew.sh/formula/postgresql
-- Windows: https://community.chocolatey.org/packages/postgresql

-- Create database and user
-- Connect as user postgres (you might have created database during install process):
-- psql -d postgres -u postgres
CREATE DATABASE dev;
CREATE USER dev WITH ENCRYPTED PASSWORD 'dev';
GRANT ALL PRIVILEGES ON DATABASE dev TO dev;

-- Create tables
-- Now connected as psql -U dev -d dev
create table authors
(
    id         serial constraint authors_pk primary key,
    name       text                                  not null,
    created_at timestamptz default CURRENT_TIMESTAMP not null,
    updated_at timestamptz default CURRENT_TIMESTAMP
);

-- Create functions and triggers
CREATE OR REPLACE FUNCTION updated_at_trigger()
RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
$$ language 'plpgsql';

-- Apply trigger to table
CREATE TRIGGER auto_update_updated_at_timestamp BEFORE UPDATE ON authors FOR EACH ROW EXECUTE PROCEDURE updated_at_trigger();

-- Populate data
INSERT INTO authors (name) VALUES ('Bruce Banner');
INSERT INTO authors (name) VALUES ('Tony Stark');
INSERT INTO authors (name) VALUES ('Peter Parker');
INSERT INTO authors (name) VALUES ('Steve Rogers');