SET client_encoding = 'UTF8';

DO $$
    BEGIN
        IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'admin') THEN
            CREATE USER admin WITH PASSWORD 'admin';
        END IF;
    END $$;

DO $$
    BEGIN
        IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'hbotDb') THEN
            CREATE DATABASE "hbotDb";
        END IF;
    END $$;

ALTER DATABASE "hbotDb" OWNER TO admin;

GRANT ALL PRIVILEGES ON DATABASE "hbotDb" TO admin;
