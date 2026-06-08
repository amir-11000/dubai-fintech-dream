
-- Sanitize public inserts to job_applications
CREATE OR REPLACE FUNCTION public.sanitize_job_application_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin') THEN
    NEW.admin_notes := NULL;
    NEW.status := 'pending_review';
    NEW.ip_address := NULL;
    NEW.source := NULL;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sanitize_job_application_insert ON public.job_applications;
CREATE TRIGGER trg_sanitize_job_application_insert
BEFORE INSERT ON public.job_applications
FOR EACH ROW EXECUTE FUNCTION public.sanitize_job_application_insert();

-- Sanitize public inserts to talent_pool
CREATE OR REPLACE FUNCTION public.sanitize_talent_pool_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin') THEN
    NEW.admin_notes := NULL;
    NEW.status := 'new';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sanitize_talent_pool_insert ON public.talent_pool;
CREATE TRIGGER trg_sanitize_talent_pool_insert
BEFORE INSERT ON public.talent_pool
FOR EACH ROW EXECUTE FUNCTION public.sanitize_talent_pool_insert();
