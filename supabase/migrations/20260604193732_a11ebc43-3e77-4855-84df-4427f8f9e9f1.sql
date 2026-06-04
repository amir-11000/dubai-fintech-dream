
CREATE POLICY "Anyone can upload application files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'applications');

CREATE POLICY "Admins can read application files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'applications' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete application files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'applications' AND public.has_role(auth.uid(), 'admin'));
