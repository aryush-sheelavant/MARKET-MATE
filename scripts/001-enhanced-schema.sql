-- =====================================================
-- MARKETMATE Enhanced Schema Migration
-- Version: 001 - Core Schema Updates for New Features
-- =====================================================

-- =====================================================
-- 1. STUDENT PORTFOLIO TABLES
-- =====================================================

-- Student Education Details
CREATE TABLE IF NOT EXISTS student_education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  degree TEXT NOT NULL,
  major TEXT NOT NULL,
  institution TEXT NOT NULL,
  graduation_year INTEGER,
  gpa DECIMAL(3,2),
  transcript_url TEXT,
  certificate_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student Projects
CREATE TABLE IF NOT EXISTS student_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  role TEXT,
  start_date DATE,
  end_date DATE,
  project_url TEXT,
  github_url TEXT,
  demo_url TEXT,
  image_urls TEXT[], -- Array of image URLs
  technologies TEXT[], -- Array of technologies used
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student Certificates & Courses
CREATE TABLE IF NOT EXISTS student_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  issuing_organization TEXT NOT NULL,
  issue_date DATE,
  expiry_date DATE,
  credential_id TEXT,
  credential_url TEXT,
  certificate_url TEXT, -- Uploaded certificate file
  skills TEXT[], -- Skills associated with this certificate
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student Additional Skills (verifiable skills with proficiency)
CREATE TABLE IF NOT EXISTS student_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  skill_name TEXT NOT NULL,
  skill_category TEXT, -- e.g., 'programming', 'language', 'software', 'certification'
  proficiency_level TEXT CHECK (proficiency_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  years_experience INTEGER,
  is_verified BOOLEAN DEFAULT FALSE,
  verification_url TEXT, -- Link to proof
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, skill_name)
);

-- Student Resume/CV
CREATE TABLE IF NOT EXISTS student_resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. MERCHANT BUSINESS PORTFOLIO TABLES
-- =====================================================

-- Merchant Business Details (extends profiles)
CREATE TABLE IF NOT EXISTS merchant_business (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  business_name TEXT NOT NULL,
  logo_url TEXT,
  business_summary TEXT,
  mission TEXT,
  industry TEXT,
  founded_year INTEGER,
  team_size TEXT, -- e.g., '1-10', '11-50', '51-200'
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Merchant Products/Services
CREATE TABLE IF NOT EXISTS merchant_offerings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES merchant_business(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price_range TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Merchant Location
CREATE TABLE IF NOT EXISTS merchant_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES merchant_business(id) ON DELETE CASCADE NOT NULL,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT,
  country TEXT DEFAULT 'India',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_primary BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Merchant Gallery
CREATE TABLE IF NOT EXISTS merchant_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES merchant_business(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  image_type TEXT CHECK (image_type IN ('shop', 'team', 'product', 'event', 'other')),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. PROMO CODE & ROI TRACKING TABLES
-- =====================================================

-- Promo Codes
CREATE TABLE IF NOT EXISTS promo_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  discount_type TEXT CHECK (discount_type IN ('percentage', 'fixed', 'none')),
  discount_value DECIMAL(10, 2),
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valid_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Promo Code Usage Tracking
CREATE TABLE IF NOT EXISTS promo_code_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promo_code_id UUID REFERENCES promo_codes(id) ON DELETE CASCADE NOT NULL,
  customer_identifier TEXT, -- Could be email, phone, or anonymous ID
  used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT, -- e.g., 'platform_listing', 'social_media', 'direct'
  metadata JSONB -- Additional tracking data
);

-- Merchant ROI Metrics (aggregated data)
CREATE TABLE IF NOT EXISTS merchant_roi_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  new_customers_count INTEGER DEFAULT 0,
  total_promo_uses INTEGER DEFAULT 0,
  estimated_revenue DECIMAL(12, 2),
  platform_referrals INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(merchant_id, period_start, period_end)
);

-- =====================================================
-- 4. PAYMENT TABLES
-- =====================================================

-- Payment Transactions
CREATE TABLE IF NOT EXISTS payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  merchant_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  amount DECIMAL(12, 2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_method TEXT CHECK (payment_method IN ('upi', 'netbanking', 'credit_card', 'debit_card')),
  status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
  transaction_ref TEXT UNIQUE,
  gateway_response JSONB,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payment Support Tickets
CREATE TABLE IF NOT EXISTS payment_support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID REFERENCES payment_transactions(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  issue_type TEXT CHECK (issue_type IN ('payment_failed', 'refund_request', 'wrong_amount', 'technical_error', 'other')),
  description TEXT NOT NULL,
  status TEXT CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')) DEFAULT 'open',
  resolution TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 5. UPDATE PROFILES TABLE
-- =====================================================

-- Add new columns to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS profile_completion INTEGER DEFAULT 0;

-- =====================================================
-- 6. ROW LEVEL SECURITY POLICIES
-- =====================================================

-- Enable RLS on all new tables
ALTER TABLE student_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_business ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_offerings ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_code_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_roi_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_support_tickets ENABLE ROW LEVEL SECURITY;

-- Student Education Policies
CREATE POLICY "Users can view all student education" ON student_education FOR SELECT USING (true);
CREATE POLICY "Users can insert own education" ON student_education FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own education" ON student_education FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own education" ON student_education FOR DELETE USING (auth.uid() = user_id);

-- Student Projects Policies
CREATE POLICY "Users can view all student projects" ON student_projects FOR SELECT USING (true);
CREATE POLICY "Users can insert own projects" ON student_projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON student_projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON student_projects FOR DELETE USING (auth.uid() = user_id);

-- Student Certificates Policies
CREATE POLICY "Users can view all student certificates" ON student_certificates FOR SELECT USING (true);
CREATE POLICY "Users can insert own certificates" ON student_certificates FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own certificates" ON student_certificates FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own certificates" ON student_certificates FOR DELETE USING (auth.uid() = user_id);

-- Student Skills Policies
CREATE POLICY "Users can view all student skills" ON student_skills FOR SELECT USING (true);
CREATE POLICY "Users can insert own skills" ON student_skills FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own skills" ON student_skills FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own skills" ON student_skills FOR DELETE USING (auth.uid() = user_id);

-- Student Resumes Policies
CREATE POLICY "Users can view all resumes" ON student_resumes FOR SELECT USING (true);
CREATE POLICY "Users can insert own resumes" ON student_resumes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own resumes" ON student_resumes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own resumes" ON student_resumes FOR DELETE USING (auth.uid() = user_id);

-- Merchant Business Policies
CREATE POLICY "Anyone can view merchant business" ON merchant_business FOR SELECT USING (true);
CREATE POLICY "Users can insert own business" ON merchant_business FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own business" ON merchant_business FOR UPDATE USING (auth.uid() = user_id);

-- Merchant Offerings Policies
CREATE POLICY "Anyone can view offerings" ON merchant_offerings FOR SELECT USING (true);
CREATE POLICY "Merchants can manage own offerings" ON merchant_offerings FOR ALL USING (
  business_id IN (SELECT id FROM merchant_business WHERE user_id = auth.uid())
);

-- Merchant Locations Policies
CREATE POLICY "Anyone can view locations" ON merchant_locations FOR SELECT USING (true);
CREATE POLICY "Merchants can manage own locations" ON merchant_locations FOR ALL USING (
  business_id IN (SELECT id FROM merchant_business WHERE user_id = auth.uid())
);

-- Merchant Gallery Policies
CREATE POLICY "Anyone can view gallery" ON merchant_gallery FOR SELECT USING (true);
CREATE POLICY "Merchants can manage own gallery" ON merchant_gallery FOR ALL USING (
  business_id IN (SELECT id FROM merchant_business WHERE user_id = auth.uid())
);

-- Promo Codes Policies
CREATE POLICY "Users can view active promo codes" ON promo_codes FOR SELECT USING (is_active = true);
CREATE POLICY "Merchants can manage own promo codes" ON promo_codes FOR ALL USING (auth.uid() = merchant_id);

-- Promo Code Usage Policies
CREATE POLICY "Merchants can view own promo usage" ON promo_code_usage FOR SELECT USING (
  promo_code_id IN (SELECT id FROM promo_codes WHERE merchant_id = auth.uid())
);
CREATE POLICY "Anyone can insert promo usage" ON promo_code_usage FOR INSERT WITH CHECK (true);

-- Merchant ROI Metrics Policies
CREATE POLICY "Merchants can view own metrics" ON merchant_roi_metrics FOR SELECT USING (auth.uid() = merchant_id);
CREATE POLICY "System can insert metrics" ON merchant_roi_metrics FOR INSERT WITH CHECK (true);

-- Payment Transactions Policies
CREATE POLICY "Users can view own transactions" ON payment_transactions FOR SELECT USING (auth.uid() = user_id OR auth.uid() = merchant_id);
CREATE POLICY "Users can insert transactions" ON payment_transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Payment Support Tickets Policies
CREATE POLICY "Users can view own tickets" ON payment_support_tickets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert tickets" ON payment_support_tickets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tickets" ON payment_support_tickets FOR UPDATE USING (auth.uid() = user_id);

-- =====================================================
-- 7. INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_student_education_user ON student_education(user_id);
CREATE INDEX IF NOT EXISTS idx_student_projects_user ON student_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_student_certificates_user ON student_certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_student_skills_user ON student_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_student_skills_category ON student_skills(skill_category);
CREATE INDEX IF NOT EXISTS idx_student_resumes_user ON student_resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_merchant_business_user ON merchant_business(user_id);
CREATE INDEX IF NOT EXISTS idx_promo_codes_merchant ON promo_codes(merchant_id);
CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_promo_code_usage_code ON promo_code_usage(promo_code_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_user ON payment_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_merchant ON payment_transactions(merchant_id);
