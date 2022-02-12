-- Create function that automatically updates updatedAt field.
CREATE OR REPLACE FUNCTION updated_at_trigger()
RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
$$ language 'plsql';

-- Apply trigger to table
CREATE TRIGGER auto_update_updated_at_timestamp BEFORE UPDATE ON authors FOR EACH ROW EXECUTE PROCEDURE updated_at_trigger();