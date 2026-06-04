
CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email CITEXT NOT NULL UNIQUE,
  source TEXT,
  country TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX waitlist_created_at_idx ON public.waitlist (created_at DESC);

GRANT INSERT ON public.waitlist TO anon, authenticated;
GRANT SELECT, DELETE ON public.waitlist TO authenticated;
GRANT ALL ON public.waitlist TO service_role;

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join waitlist"
  ON public.waitlist FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins view waitlist"
  ON public.waitlist FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins delete waitlist"
  ON public.waitlist FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
