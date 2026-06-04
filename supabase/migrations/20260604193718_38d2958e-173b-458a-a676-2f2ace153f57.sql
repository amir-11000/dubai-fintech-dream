
-- ============ JOB POSITIONS ============
CREATE TABLE public.job_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  employment_type TEXT NOT NULL,
  work_mode TEXT NOT NULL,
  location TEXT NOT NULL,
  experience_level TEXT NOT NULL,
  salary_range TEXT,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  requirements TEXT[] NOT NULL DEFAULT '{}',
  benefits TEXT[] NOT NULL DEFAULT '{}',
  reporting_to TEXT,
  application_deadline DATE,
  category TEXT NOT NULL DEFAULT 'full_time',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.job_positions TO anon, authenticated;
GRANT ALL ON public.job_positions TO service_role;
ALTER TABLE public.job_positions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active positions"
  ON public.job_positions FOR SELECT
  USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage positions"
  ON public.job_positions FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_job_positions_updated
  BEFORE UPDATE ON public.job_positions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ JOB APPLICATIONS ============
CREATE TABLE public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  position_id UUID REFERENCES public.job_positions(id) ON DELETE SET NULL,
  position_title TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  linkedin_url TEXT,
  portfolio_url TEXT,
  github_url TEXT,
  current_company TEXT,
  cover_letter TEXT,
  cv_path TEXT,
  portfolio_path TEXT,
  supporting_path TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  admin_notes TEXT,
  source TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.job_applications TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.job_applications TO authenticated;
GRANT ALL ON public.job_applications TO service_role;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can apply"
  ON public.job_applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view applications"
  ON public.job_applications FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update applications"
  ON public.job_applications FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete applications"
  ON public.job_applications FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_job_applications_updated
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_job_applications_status ON public.job_applications(status);
CREATE INDEX idx_job_applications_position ON public.job_applications(position_id);
CREATE INDEX idx_job_applications_created ON public.job_applications(created_at DESC);

-- ============ TALENT POOL ============
CREATE TABLE public.talent_pool (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT NOT NULL,
  area_of_interest TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  cv_path TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.talent_pool TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.talent_pool TO authenticated;
GRANT ALL ON public.talent_pool TO service_role;
ALTER TABLE public.talent_pool ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join talent pool"
  ON public.talent_pool FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view talent pool"
  ON public.talent_pool FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update talent pool"
  ON public.talent_pool FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete talent pool"
  ON public.talent_pool FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_talent_pool_updated
  BEFORE UPDATE ON public.talent_pool
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ SEED 14 POSITIONS ============
INSERT INTO public.job_positions (slug, title, department, employment_type, work_mode, location, experience_level, salary_range, short_description, description, responsibilities, requirements, benefits, reporting_to, category, sort_order) VALUES
('senior-full-stack-developer', 'Senior Full Stack Developer', 'Engineering', 'Full-time', 'Hybrid', 'Dubai, UAE', 'Senior (5+ years)', 'AED 30,000 – 45,000 / month', 'Build the core wallet, payments and AI systems that power Shoho Pay across the UAE.',
'Join the engineering team building the foundation of Shoho Pay — multi-currency wallets, real-time payments, crypto and gold rails, and the Billy AI financial assistant. You will work across the full stack with a small senior team, ship to production weekly, and own systems end-to-end.',
ARRAY['Design, build and ship features across web and mobile clients and backend services', 'Architect scalable APIs and event-driven systems for payments and wallet operations', 'Partner with product, design and compliance to deliver regulated fintech features', 'Lead code reviews, set quality bars, and mentor mid-level engineers', 'Own reliability, observability and incident response for production systems'],
ARRAY['5+ years building production web applications with TypeScript and React', 'Strong backend experience with Node.js or Deno and Postgres', 'Experience designing and securing financial or transactional systems', 'Track record of shipping high-quality software in fast-moving startups', 'Excellent communication in English; Arabic a plus'],
ARRAY['Competitive AED salary and meaningful equity', 'Private health insurance', 'UAE work visa and relocation support', 'Premium hardware of your choice', 'Quarterly learning and conference budget'],
'Head of Engineering', 'full_time', 1),

('product-designer', 'Product Designer', 'Design', 'Full-time', 'Hybrid', 'Dubai, UAE', 'Mid–Senior (4+ years)', 'AED 22,000 – 32,000 / month', 'Shape the look, feel and motion of a luxury UAE fintech used by everyone from teens to family offices.',
'We are looking for a Product Designer who treats craft as a craft. You will own end-to-end design for major flows across the Shoho Pay app and website — from first sketch to shipped pixels — working directly with founders and engineering.',
ARRAY['Own end-to-end design for major product surfaces (wallets, payments, crypto, gold, Billy AI)', 'Design with motion in mind — micro-interactions, transitions, haptics', 'Evolve the Shoho Pay design system in Figma and code tokens', 'Run usability sessions with UAE users in English and Arabic contexts', 'Partner with marketing on landing pages, campaigns and brand moments'],
ARRAY['4+ years designing consumer products at high craft bars', 'Strong portfolio showing fintech, luxury or premium consumer work', 'Fluency in Figma, prototyping, and design systems', 'Comfort designing RTL Arabic layouts and bilingual experiences', 'Bonus: motion design and front-end (HTML/CSS/React) literacy'],
ARRAY['Competitive AED salary and equity', 'Private health insurance', 'Relocation support to Dubai', 'Top-tier hardware and Figma + plugin budget', 'Conference and learning stipend'],
'Head of Design', 'full_time', 2),

('compliance-officer', 'Compliance Officer', 'Legal & Compliance', 'Full-time', 'On-site', 'Dubai, UAE (DIFC)', 'Senior (5+ years)', 'AED 28,000 – 42,000 / month', 'Own AML, KYC and regulatory readiness as Shoho Pay scales across the UAE and GCC.',
'You will lead day-to-day compliance operations and partner with leadership on licensing strategy with UAE regulators. This is a hands-on role for someone who has built compliance frameworks at a regulated payments or banking institution.',
ARRAY['Own KYC, AML, sanctions and transaction-monitoring frameworks', 'Be the primary interface with UAE regulators and external counsel', 'Draft and maintain internal compliance policies and SOPs', 'Lead suspicious activity reviews and STR filings', 'Train product and engineering on regulatory obligations'],
ARRAY['5+ years compliance experience at a UAE-licensed bank, EMI or payments firm', 'Deep familiarity with UAE Central Bank, VARA, ADGM or DIFC regimes', 'ICA, ACAMS or equivalent certification', 'Strong English written communication; Arabic strongly preferred', 'Comfort working hands-on inside a small fast-moving team'],
ARRAY['Senior-level AED package and equity', 'Private health insurance', 'Regulatory training and certification budget', 'Direct line to the CEO and board'],
'Chief Compliance Officer', 'full_time', 3),

('marketing-manager', 'Marketing Manager', 'Marketing', 'Full-time', 'Hybrid', 'Dubai, UAE', 'Mid–Senior (4+ years)', 'AED 20,000 – 30,000 / month', 'Build the Shoho Pay brand into the most-loved fintech in the UAE.',
'Own brand, growth and content marketing end-to-end. You will run launch campaigns, manage performance channels, and grow our presence with the UAE community both online and offline.',
ARRAY['Plan and execute brand and product launch campaigns', 'Own paid and organic growth across Instagram, TikTok, Google and LinkedIn', 'Commission and ship best-in-class content (video, design, written)', 'Manage agency, creator and partnership relationships', 'Report weekly on funnel metrics — CAC, activation, retention'],
ARRAY['4+ years marketing experience at consumer apps, fintech or luxury brands', 'Strong taste; track record of campaigns you are proud to show', 'Comfort with both brand storytelling and performance dashboards', 'Bilingual English/Arabic strongly preferred', 'UAE market experience required'],
ARRAY['Competitive AED salary and equity', 'Private health insurance', 'Generous content production budget', 'Conference and learning stipend'],
'Head of Marketing', 'full_time', 4),

('business-development-manager', 'Business Development Manager', 'Partnerships', 'Full-time', 'Hybrid', 'Dubai, UAE', 'Senior (5+ years)', 'AED 25,000 – 38,000 + commission', 'Open doors with the biggest merchants, banks and partners in the UAE.',
'You will own partnership pipeline and closing for Shoho Pay — from merchant acquiring partners to crypto and gold counterparties to enterprise distribution deals.',
ARRAY['Build and close a pipeline of strategic partners across the UAE and GCC', 'Negotiate commercial, technical and compliance terms end-to-end', 'Represent Shoho Pay at industry events, panels and 1:1 meetings', 'Partner with product on co-built integrations and feature launches', 'Maintain CRM and report pipeline health weekly'],
ARRAY['5+ years BD or enterprise sales experience in UAE fintech, banking or payments', 'Existing senior network across UAE banks, merchants or regulators', 'Strong commercial and negotiation skills', 'Excellent English written and spoken; Arabic strongly preferred'],
ARRAY['Strong base + uncapped commission', 'Meaningful equity', 'Private health insurance', 'Travel budget across the GCC'],
'Chief Business Officer', 'full_time', 5),

('customer-support-specialist', 'Customer Support Specialist', 'Operations', 'Full-time', 'On-site', 'Dubai, UAE', 'Junior–Mid (2+ years)', 'AED 9,000 – 14,000 / month', 'Deliver the calmest, kindest, most premium customer support in UAE fintech.',
'You will be the human face of Shoho Pay for thousands of customers. We treat support as a craft and a strategic function — not a cost center.',
ARRAY['Respond to customer messages across in-app chat, email and WhatsApp', 'Resolve account, payment and KYC issues with empathy and accuracy', 'Triage bugs to engineering and feature requests to product', 'Maintain and improve the public help center', 'Spot patterns and surface insights to product weekly'],
ARRAY['2+ years customer-facing support experience, ideally in fintech or premium brands', 'Native-level English; fluent Arabic strongly preferred', 'Calm under pressure, fast and accurate writer', 'Comfort with modern support tools (Intercom, Zendesk, etc.)'],
ARRAY['Competitive AED salary', 'Private health insurance', 'Clear growth path into Ops, Risk or Product', 'Annual learning budget'],
'Head of Operations', 'full_time', 6),

('ai-engineer', 'AI Engineer', 'Engineering', 'Full-time', 'Hybrid', 'Dubai, UAE', 'Mid–Senior (4+ years)', 'AED 30,000 – 48,000 / month', 'Build Billy — the AI financial assistant inside every Shoho Pay account.',
'Own the AI stack behind Billy: retrieval, evaluation, agents, fine-tuning, prompt engineering, and the user-facing experience. You will work at the boundary of cutting-edge AI research and regulated financial product.',
ARRAY['Design and ship Billy''s reasoning pipelines (retrieval, tools, evaluations)', 'Integrate frontier LLMs with internal financial data safely and reliably', 'Build evaluation harnesses and continuous quality monitoring', 'Partner with product and design on conversational UX', 'Own latency, cost and safety budgets for AI features'],
ARRAY['4+ years software engineering + 1+ year shipping production LLM features', 'Strong Python or TypeScript; comfort with vector databases', 'Practical experience with RAG, evals and prompt engineering', 'Mindset of measurement: you ship eval-driven, not vibes-driven', 'Bonus: experience in fintech, search, or assistant products'],
ARRAY['Top-of-band AED salary and meaningful equity', 'Generous LLM API and compute budget', 'Conference and research budget', 'Private health insurance and relocation'],
'Head of Engineering', 'full_time', 7),

('partnership-manager', 'Partnership Manager', 'Partnerships', 'Full-time', 'Hybrid', 'Dubai, UAE', 'Mid (3+ years)', 'AED 18,000 – 28,000 + commission', 'Activate and grow our merchant, crypto, gold and ecosystem partnerships.',
'Where the BD Manager opens doors, you keep partners successful, growing and renewing. Own the partner lifecycle from launch to expansion.',
ARRAY['Onboard new partners across product, legal and technical workstreams', 'Run quarterly business reviews and growth plans with key partners', 'Surface partner feedback into product and engineering roadmaps', 'Coordinate co-marketing moments and launches', 'Maintain accurate partner CRM and reporting'],
ARRAY['3+ years partnership, account management or BD experience in UAE', 'Proven ability to grow accounts and renew partnerships', 'Strong commercial communication in English; Arabic a plus', 'Comfort working across product, legal, finance and marketing'],
ARRAY['Competitive AED salary + commission', 'Equity', 'Private health insurance', 'Travel across the GCC'],
'Chief Business Officer', 'full_time', 8),

('contract-ui-ux-designer', 'UI/UX Designer', 'Design', 'Contract', 'Remote', 'Remote (GCC time zones preferred)', 'Mid–Senior', 'Project-based', 'Help us ship product and marketing surfaces at a premium craft bar, on a flexible engagement.',
'A rolling 3–6 month contract for a senior designer who wants to ship at speed alongside our in-house team. Specific scope agreed per engagement.',
ARRAY['Design product and marketing flows end-to-end against agreed scope', 'Work directly with founders and product team', 'Deliver Figma files ready for engineering handoff'],
ARRAY['Strong portfolio in fintech, SaaS or premium consumer apps', 'Comfort working independently against milestone deadlines', 'Strong English written communication'],
ARRAY['Competitive project rates in USD or AED', 'Flexible hours', 'Long-term renewal for strong performers'],
NULL, 'contractor', 10),

('contract-motion-designer', 'Motion Designer', 'Design', 'Contract', 'Remote', 'Remote', 'Mid–Senior', 'Project-based', 'Craft cinematic motion for our brand films, product reveals and in-app micro-interactions.',
'Project-based engagements for a motion designer with a luxury, cinematic sensibility. After Effects, Lottie and Rive workflows welcome.',
ARRAY['Design and animate brand films and product reveal videos', 'Produce Lottie/Rive animations ready for engineering integration', 'Collaborate with product and marketing design'],
ARRAY['Strong showreel with luxury, fintech or Apple-style work', 'After Effects + Lottie or Rive proficiency', 'Independent and milestone-driven'],
ARRAY['Project rates aligned with senior motion talent', 'Long-term renewals for strong performers'],
NULL, 'contractor', 11),

('contract-mobile-developer', 'Mobile Developer', 'Engineering', 'Contract', 'Remote', 'Remote (GCC time zones preferred)', 'Senior', 'Project-based', 'Ship native-quality iOS and Android experiences alongside our core team.',
'Looking for senior React Native (or native iOS/Android) engineers for defined project scopes — typically 6–12 week sprints with renewal.',
ARRAY['Build and ship mobile features against agreed scope', 'Maintain high quality across performance, accessibility and security', 'Coordinate with backend and design teams'],
ARRAY['Senior React Native experience (or native iOS/Android)', 'Track record shipping production financial or transactional apps', 'Strong communication in English'],
ARRAY['Competitive USD/AED project rates', 'Renewable engagements', 'Flexible schedule'],
NULL, 'contractor', 12),

('contract-arabic-translator', 'Arabic Translator', 'Marketing', 'Contract', 'Remote', 'Remote (UAE/GCC preferred)', 'Mid–Senior', 'Per-project rate', 'Translate Shoho Pay product, marketing and legal copy into elegant, native MSA Arabic.',
'Ongoing partnership for a native Arabic translator with fintech or legal experience. We care about voice, tone and clarity — not literal translations.',
ARRAY['Translate product UI, marketing pages and legal documents into MSA Arabic', 'Preserve tone of voice and luxury feel across surfaces', 'Review and improve existing Arabic copy'],
ARRAY['Native Arabic speaker with strong English comprehension', 'Prior translation work in fintech, banking or legal preferred', 'Comfort with iterative editorial review'],
ARRAY['Competitive per-project rates', 'Long-term partnership for strong performers'],
NULL, 'contractor', 13),

('contract-copywriter', 'Copywriter', 'Marketing', 'Contract', 'Remote', 'Remote', 'Mid–Senior', 'Per-project rate', 'Write the words behind a luxury fintech brand — landing pages, product copy, emails and campaigns.',
'Project-based engagements for a senior copywriter with a sharp, premium voice and ideally fintech or luxury background.',
ARRAY['Write landing pages, product copy, email and ad campaigns', 'Help evolve the Shoho Pay tone of voice', 'Collaborate with design and marketing on launches'],
ARRAY['Portfolio showing premium, fintech or luxury brand work', 'Native-level English; bilingual EN/AR a plus', 'Strong editorial sensibility'],
ARRAY['Competitive project rates', 'Long-term renewals for strong performers'],
NULL, 'contractor', 14),

('contract-video-editor', 'Video Editor', 'Marketing', 'Contract', 'Remote', 'Remote', 'Mid–Senior', 'Per-project rate', 'Edit cinematic brand films and high-performing short-form video for Shoho Pay.',
'Ongoing project work for a video editor with a luxury, modern, fintech-aligned eye. Premiere/Resolve/Final Cut welcome.',
ARRAY['Edit long-form brand films and short-form social content', 'Color grade and sound design to a premium bar', 'Coordinate with motion designer and marketing'],
ARRAY['Strong reel with premium brand or fintech work', 'Mastery of one major NLE; comfort with grading and sound', 'Reliable, milestone-driven workflow'],
ARRAY['Competitive project rates', 'Long-term renewal for strong performers'],
NULL, 'contractor', 15);
