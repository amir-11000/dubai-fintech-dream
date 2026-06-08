
-- 1) Remove hardcoded admin emails from handle_new_user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_email TEXT;
  v_phone TEXT;
  v_name TEXT;
BEGIN
  v_email := COALESCE(NEW.email, NEW.raw_user_meta_data->>'email');
  v_phone := COALESCE(NEW.phone, NEW.raw_user_meta_data->>'phone');
  v_name  := NEW.raw_user_meta_data->>'full_name';

  INSERT INTO public.profiles (user_id, full_name, email, phone, last_login)
  VALUES (NEW.id, v_name, v_email, v_phone, now())
  ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$function$;

-- 2) Tighten applications bucket upload policy
DROP POLICY IF EXISTS "Anyone can upload application files" ON storage.objects;

CREATE POLICY "Anyone can upload application files"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'applications'
  AND (storage.foldername(name))[1] IN ('cv', 'portfolio', 'talent')
  AND lower(regexp_replace(name, '^.*\.', '')) IN ('pdf','doc','docx','png','jpg','jpeg')
  AND length(name) < 512
);
