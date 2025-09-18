-- Location: supabase/migrations/20250918131833_recruitment_analytics_with_auth.sql
-- Schema Analysis: No existing schema - Fresh project
-- Integration Type: Complete new schema with authentication
-- Dependencies: None (fresh start)

-- 1. ENUMS AND TYPES FIRST
CREATE TYPE public.user_role AS ENUM ('admin', 'hr_manager', 'recruiter', 'analyst');
CREATE TYPE public.job_status AS ENUM ('draft', 'active', 'paused', 'closed', 'cancelled');
CREATE TYPE public.candidate_status AS ENUM ('applied', 'screening', 'interview', 'offer', 'hired', 'rejected');
CREATE TYPE public.priority_level AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE public.department_type AS ENUM ('engineering', 'marketing', 'sales', 'hr', 'finance', 'operations', 'design', 'product');

-- 2. CORE TABLES (NO FOREIGN KEYS)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'recruiter'::public.user_role,
    department public.department_type,
    avatar_url TEXT,
    phone TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    industry TEXT,
    size_range TEXT,
    location TEXT,
    website_url TEXT,
    logo_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. DEPENDENT TABLES (WITH FOREIGN KEYS TO EXISTING TABLES)
CREATE TABLE public.jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    created_by UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    requirements TEXT,
    department public.department_type,
    location TEXT,
    salary_min INTEGER,
    salary_max INTEGER,
    currency TEXT DEFAULT 'USD',
    employment_type TEXT DEFAULT 'full-time',
    remote_allowed BOOLEAN DEFAULT false,
    priority public.priority_level DEFAULT 'medium'::public.priority_level,
    status public.job_status DEFAULT 'draft'::public.job_status,
    positions_available INTEGER DEFAULT 1,
    positions_filled INTEGER DEFAULT 0,
    application_deadline DATE,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    resume_url TEXT,
    skills TEXT[], -- Array of skill tags
    experience_years INTEGER,
    current_title TEXT,
    current_company TEXT,
    location TEXT,
    salary_expectation INTEGER,
    availability_date DATE,
    source TEXT, -- LinkedIn, Indeed, Referral, etc.
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
    candidate_id UUID REFERENCES public.candidates(id) ON DELETE CASCADE,
    assigned_recruiter UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    status public.candidate_status DEFAULT 'applied'::public.candidate_status,
    application_date DATE DEFAULT CURRENT_DATE,
    cover_letter TEXT,
    screening_score INTEGER, -- 1-10 rating
    interview_feedback TEXT,
    rejection_reason TEXT,
    offer_amount INTEGER,
    offer_deadline DATE,
    start_date DATE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(job_id, candidate_id)
);

CREATE TABLE public.recruitment_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
    recruiter_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    metric_date DATE DEFAULT CURRENT_DATE,
    applications_received INTEGER DEFAULT 0,
    screenings_completed INTEGER DEFAULT 0,
    interviews_scheduled INTEGER DEFAULT 0,
    interviews_completed INTEGER DEFAULT 0,
    offers_made INTEGER DEFAULT 0,
    offers_accepted INTEGER DEFAULT 0,
    time_to_hire_days INTEGER,
    cost_per_hire DECIMAL(10,2),
    quality_score DECIMAL(3,2), -- 1.00 to 10.00
    diversity_score DECIMAL(3,2), -- Percentage representation
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.hiring_stages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE,
    stage_name TEXT NOT NULL, -- 'Application Review', 'Phone Screen', 'Technical Interview', etc.
    stage_order INTEGER NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, completed, skipped, failed
    scheduled_date TIMESTAMPTZ,
    completed_date TIMESTAMPTZ,
    feedback TEXT,
    interviewer_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    score INTEGER, -- 1-10 rating
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. ANALYTICS TRACKING TABLES
CREATE TABLE public.daily_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE DEFAULT CURRENT_DATE,
    department public.department_type,
    total_jobs INTEGER DEFAULT 0,
    active_jobs INTEGER DEFAULT 0,
    new_applications INTEGER DEFAULT 0,
    interviews_scheduled INTEGER DEFAULT 0,
    offers_made INTEGER DEFAULT 0,
    hires_completed INTEGER DEFAULT 0,
    average_time_to_hire DECIMAL(5,2),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(date, department)
);

CREATE TABLE public.recruiter_performance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recruiter_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    metric_period DATE DEFAULT date_trunc('month', CURRENT_DATE)::DATE,
    jobs_managed INTEGER DEFAULT 0,
    applications_processed INTEGER DEFAULT 0,
    interviews_conducted INTEGER DEFAULT 0,
    successful_hires INTEGER DEFAULT 0,
    average_time_to_hire DECIMAL(5,2),
    quality_rating DECIMAL(3,2),
    activity_score INTEGER, -- Gamification points
    badges_earned TEXT[], -- Achievement badges
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(recruiter_id, metric_period)
);

-- 5. ESSENTIAL INDEXES
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_user_profiles_department ON public.user_profiles(department);
CREATE INDEX idx_jobs_status ON public.jobs(status);
CREATE INDEX idx_jobs_department ON public.jobs(department);
CREATE INDEX idx_jobs_created_by ON public.jobs(created_by);
CREATE INDEX idx_jobs_company_id ON public.jobs(company_id);
CREATE INDEX idx_applications_job_id ON public.applications(job_id);
CREATE INDEX idx_applications_candidate_id ON public.applications(candidate_id);
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_applications_assigned_recruiter ON public.applications(assigned_recruiter);
CREATE INDEX idx_candidates_email ON public.candidates(email);
CREATE INDEX idx_candidates_skills ON public.candidates USING GIN(skills);
CREATE INDEX idx_recruitment_metrics_date ON public.recruitment_metrics(metric_date);
CREATE INDEX idx_recruitment_metrics_recruiter ON public.recruitment_metrics(recruiter_id);
CREATE INDEX idx_hiring_stages_application ON public.hiring_stages(application_id);
CREATE INDEX idx_daily_analytics_date ON public.daily_analytics(date);
CREATE INDEX idx_recruiter_performance_period ON public.recruiter_performance(metric_period);

-- 6. HELPER FUNCTIONS (BEFORE RLS POLICIES)
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $func$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$func$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $func$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role, department)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'recruiter'::public.user_role),
    COALESCE((NEW.raw_user_meta_data->>'department')::public.department_type, 'hr'::public.department_type)
  );
  RETURN NEW;
END;
$func$;

CREATE OR REPLACE FUNCTION public.is_admin_from_auth()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM auth.users au
    WHERE au.id = auth.uid() 
    AND (au.raw_user_meta_data->>'role' = 'admin' 
         OR au.raw_app_meta_data->>'role' = 'admin')
)
$$;

-- 7. ENABLE RLS ON ALL TABLES
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruitment_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hiring_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruiter_performance ENABLE ROW LEVEL SECURITY;

-- 8. RLS POLICIES (USING CORRECT PATTERNS)

-- Pattern 1: Core User Table (user_profiles) - Simple only, no functions
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Pattern 2: Simple user ownership for most tables
CREATE POLICY "users_manage_assigned_jobs"
ON public.jobs
FOR ALL
TO authenticated
USING (created_by = auth.uid())
WITH CHECK (created_by = auth.uid());

CREATE POLICY "users_manage_assigned_applications"
ON public.applications
FOR ALL
TO authenticated
USING (assigned_recruiter = auth.uid())
WITH CHECK (assigned_recruiter = auth.uid());

CREATE POLICY "users_manage_own_metrics"
ON public.recruitment_metrics
FOR ALL
TO authenticated
USING (recruiter_id = auth.uid())
WITH CHECK (recruiter_id = auth.uid());

CREATE POLICY "users_manage_own_performance"
ON public.recruiter_performance
FOR ALL
TO authenticated
USING (recruiter_id = auth.uid())
WITH CHECK (recruiter_id = auth.uid());

-- Pattern 4: Public read, private write for reference data
CREATE POLICY "public_can_read_companies"
ON public.companies
FOR SELECT
TO public
USING (true);

CREATE POLICY "authenticated_can_manage_companies"
ON public.companies
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "public_can_read_candidates"
ON public.candidates
FOR SELECT
TO public
USING (true);

CREATE POLICY "authenticated_can_manage_candidates"
ON public.candidates
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Pattern 4: Public read for analytics (dashboard visibility)
CREATE POLICY "authenticated_can_read_daily_analytics"
ON public.daily_analytics
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "authenticated_can_manage_daily_analytics"
ON public.daily_analytics
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Pattern 2: Simple user ownership for hiring stages
CREATE POLICY "users_manage_interview_stages"
ON public.hiring_stages
FOR ALL
TO authenticated
USING (interviewer_id = auth.uid())
WITH CHECK (interviewer_id = auth.uid());

-- 9. UPDATE TRIGGERS
CREATE TRIGGER handle_updated_at_user_profiles
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_jobs
    BEFORE UPDATE ON public.jobs
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_candidates
    BEFORE UPDATE ON public.candidates
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_applications
    BEFORE UPDATE ON public.applications
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_hiring_stages
    BEFORE UPDATE ON public.hiring_stages
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_recruiter_performance
    BEFORE UPDATE ON public.recruiter_performance
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 10. USER PROFILE CREATION TRIGGER
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 11. MOCK DATA FOR TESTING
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    recruiter_uuid UUID := gen_random_uuid();
    analyst_uuid UUID := gen_random_uuid();
    company1_uuid UUID := gen_random_uuid();
    company2_uuid UUID := gen_random_uuid();
    job1_uuid UUID := gen_random_uuid();
    job2_uuid UUID := gen_random_uuid();
    candidate1_uuid UUID := gen_random_uuid();
    candidate2_uuid UUID := gen_random_uuid();
    application1_uuid UUID := gen_random_uuid();
    application2_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users with complete field structure
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@talentstrike.com', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "role": "admin", "department": "hr"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (recruiter_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'recruiter@talentstrike.com', crypt('recruiter123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Sarah Johnson", "role": "recruiter", "department": "hr"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (analyst_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'analyst@talentstrike.com', crypt('analyst123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Data Analyst", "role": "analyst", "department": "hr"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create companies
    INSERT INTO public.companies (id, name, description, industry, size_range, location) VALUES
        (company1_uuid, 'TechCorp Solutions', 'Leading software development company', 'Technology', '100-500', 'San Francisco, CA'),
        (company2_uuid, 'InnovateTech', 'Innovative startup focusing on AI solutions', 'Artificial Intelligence', '10-50', 'New York, NY');

    -- Create jobs
    INSERT INTO public.jobs (id, company_id, created_by, title, description, department, location, salary_min, salary_max, status, priority, positions_available) VALUES
        (job1_uuid, company1_uuid, recruiter_uuid, 'Senior Software Engineer', 'Looking for an experienced software engineer to join our team', 'engineering'::public.department_type, 'San Francisco, CA', 120000, 180000, 'active'::public.job_status, 'high'::public.priority_level, 3),
        (job2_uuid, company2_uuid, recruiter_uuid, 'Product Marketing Manager', 'Drive product marketing strategy and execution', 'marketing'::public.department_type, 'New York, NY', 90000, 130000, 'active'::public.job_status, 'medium'::public.priority_level, 2);

    -- Create candidates
    INSERT INTO public.candidates (id, email, first_name, last_name, phone, skills, experience_years, current_title, current_company, location, salary_expectation, source) VALUES
        (candidate1_uuid, 'john.smith@email.com', 'John', 'Smith', '+1-555-0123', ARRAY['JavaScript', 'React', 'Node.js', 'Python'], 5, 'Software Engineer', 'Previous Tech Co', 'San Francisco, CA', 150000, 'LinkedIn'),
        (candidate2_uuid, 'emily.chen@email.com', 'Emily', 'Chen', '+1-555-0456', ARRAY['Product Marketing', 'Growth Strategy', 'Analytics', 'B2B Marketing'], 7, 'Marketing Manager', 'Growth Startup Inc', 'New York, NY', 110000, 'Indeed');

    -- Create applications
    INSERT INTO public.applications (id, job_id, candidate_id, assigned_recruiter, status, screening_score, application_date) VALUES
        (application1_uuid, job1_uuid, candidate1_uuid, recruiter_uuid, 'interview'::public.candidate_status, 8, CURRENT_DATE - INTERVAL '5 days'),
        (application2_uuid, job2_uuid, candidate2_uuid, recruiter_uuid, 'screening'::public.candidate_status, 7, CURRENT_DATE - INTERVAL '3 days');

    -- Create hiring stages
    INSERT INTO public.hiring_stages (application_id, stage_name, stage_order, status, interviewer_id, score) VALUES
        (application1_uuid, 'Application Review', 1, 'completed', recruiter_uuid, 8),
        (application1_uuid, 'Technical Interview', 2, 'completed', recruiter_uuid, 7),
        (application1_uuid, 'Final Interview', 3, 'scheduled', recruiter_uuid, null),
        (application2_uuid, 'Application Review', 1, 'completed', recruiter_uuid, 7),
        (application2_uuid, 'Phone Screen', 2, 'pending', recruiter_uuid, null);

    -- Create recruitment metrics
    INSERT INTO public.recruitment_metrics (job_id, recruiter_id, metric_date, applications_received, screenings_completed, interviews_scheduled, cost_per_hire, quality_score) VALUES
        (job1_uuid, recruiter_uuid, CURRENT_DATE, 12, 8, 3, 2500.00, 8.2),
        (job2_uuid, recruiter_uuid, CURRENT_DATE, 15, 10, 4, 1800.00, 7.8);

    -- Create daily analytics
    INSERT INTO public.daily_analytics (date, department, total_jobs, active_jobs, new_applications, interviews_scheduled, offers_made) VALUES
        (CURRENT_DATE, 'engineering'::public.department_type, 5, 3, 4, 2, 1),
        (CURRENT_DATE, 'marketing'::public.department_type, 3, 2, 6, 3, 0),
        (CURRENT_DATE - INTERVAL '1 day', 'engineering'::public.department_type, 5, 3, 2, 1, 0),
        (CURRENT_DATE - INTERVAL '1 day', 'marketing'::public.department_type, 3, 2, 3, 1, 1);

    -- Create recruiter performance
    INSERT INTO public.recruiter_performance (recruiter_id, metric_period, jobs_managed, applications_processed, interviews_conducted, successful_hires, activity_score, badges_earned) VALUES
        (recruiter_uuid, date_trunc('month', CURRENT_DATE)::DATE, 5, 28, 12, 3, 850, ARRAY['Top Performer', 'Quality Hire Expert']);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;