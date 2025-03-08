
-- This file defines the schema for our Supabase database

-- Create distributors table
CREATE TABLE IF NOT EXISTS distributors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  city TEXT,
  bio TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  min_quantity INTEGER NOT NULL DEFAULT 1,
  category TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  distributor_id UUID NOT NULL REFERENCES distributors(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
-- Enable RLS on tables
ALTER TABLE distributors ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for distributors table
-- Public can read all distributors
CREATE POLICY "Public can view distributors" 
  ON distributors FOR SELECT 
  USING (true);

-- Distributors can update their own profile
CREATE POLICY "Distributors can update their own profile" 
  ON distributors FOR UPDATE 
  USING (auth.uid() = id);

-- Distributors can insert their own profile
CREATE POLICY "Distributors can insert their own profile" 
  ON distributors FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create policies for products table
-- Public can read all products
CREATE POLICY "Public can view products" 
  ON products FOR SELECT 
  USING (true);

-- Distributors can insert their own products
CREATE POLICY "Distributors can insert their own products" 
  ON products FOR INSERT 
  WITH CHECK (auth.uid() = distributor_id);

-- Distributors can update their own products
CREATE POLICY "Distributors can update their own products" 
  ON products FOR UPDATE 
  USING (auth.uid() = distributor_id);

-- Distributors can delete their own products
CREATE POLICY "Distributors can delete their own products" 
  ON products FOR DELETE 
  USING (auth.uid() = distributor_id);

-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Set up storage policies
-- Anyone can view images
CREATE POLICY "Public can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

-- Authenticated users can upload images
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Users can update their own images
CREATE POLICY "Users can update their own images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'images' AND auth.uid() = owner);

-- Users can delete their own images
CREATE POLICY "Users can delete their own images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'images' AND auth.uid() = owner);
