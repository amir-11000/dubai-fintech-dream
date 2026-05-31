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

  IF lower(COALESCE(v_email, '')) IN ('amirreza.ansari1144@gmail.com', 'ansari.amirr3za@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user')
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END; $function$;

-- Ensure trigger exists on auth.users (idempotent)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- If admin user already exists, promote them now (idempotent)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users
WHERE lower(email) = 'amirreza.ansari1144@gmail.com'
ON CONFLICT DO NOTHING;