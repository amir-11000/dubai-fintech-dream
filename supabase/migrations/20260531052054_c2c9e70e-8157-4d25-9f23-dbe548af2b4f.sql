-- 1. Remove anonymous public access to contact_messages; require authenticated user
DROP POLICY IF EXISTS "Anyone can submit message" ON public.contact_messages;
REVOKE INSERT ON public.contact_messages FROM anon;

CREATE POLICY "Authenticated users can submit message"
  ON public.contact_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- 2. Strengthen profile UPDATE: add WITH CHECK so user_id cannot be reassigned
DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;

CREATE POLICY "Users update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));