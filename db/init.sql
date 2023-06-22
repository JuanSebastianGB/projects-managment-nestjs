SELECT 'CREATE DATABASE webdb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'webdb')\gexec