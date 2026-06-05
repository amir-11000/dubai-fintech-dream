
ALTER TABLE public.job_applications
  ADD COLUMN IF NOT EXISTS nationality text,
  ADD COLUMN IF NOT EXISTS current_location text,
  ADD COLUMN IF NOT EXISTS years_experience text,
  ADD COLUMN IF NOT EXISTS expected_salary text,
  ADD COLUMN IF NOT EXISTS notice_period text;

UPDATE public.job_applications SET status = 'pending_review' WHERE status IN ('new');
UPDATE public.job_applications SET status = 'under_review' WHERE status IN ('interview');
UPDATE public.job_applications SET status = 'accepted' WHERE status IN ('hired');

ALTER TABLE public.job_applications ALTER COLUMN status SET DEFAULT 'pending_review';
