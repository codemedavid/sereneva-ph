-- Fix couriers table RLS to allow anon access (admin page uses anon key)
-- This matches the MASTER_REPLICATION_SCRIPT.sql configuration
ALTER TABLE public.couriers DISABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE public.couriers TO anon, authenticated, service_role;
