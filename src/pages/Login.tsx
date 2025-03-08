
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Define form state type
type FormState = {
  email: string;
  password: string;
  isSignUp: boolean;
  name: string;
  phone: string;
  city: string;
  businessName: string;
  bio: string;
};

const Login = () => {
  // Form state
  const [form, setForm] = useState<FormState>({
    email: '',
    password: '',
    isSignUp: false,
    name: '',
    phone: '',
    city: '',
    businessName: '',
    bio: ''
  });
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Toggle between login and signup forms
  const toggleSignUp = () => {
    setForm(prev => ({ ...prev, isSignUp: !prev.isSignUp }));
    setFormErrors({});
  };

  // Update form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    // Common validation for both forms
    if (!form.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Invalid email format';
    }
    
    if (!form.password) {
      errors.password = 'Password is required';
    } else if (form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    // Additional validation for signup form
    if (form.isSignUp) {
      if (!form.name) {
        errors.name = 'Full name is required';
      }
      
      if (!form.phone) {
        errors.phone = 'Phone number is required';
      }
      
      if (!form.city) {
        errors.city = 'City is required';
      }
      
      if (!form.businessName) {
        errors.businessName = 'Business name is required';
      }
      
      if (!form.bio) {
        errors.bio = 'Business description is required';
      } else if (form.bio.length < 20) {
        errors.bio = 'Business description should be at least 20 characters';
      }
    }
    
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Simulate form submission
    setIsSubmitting(true);
    
    // In a real application, you would call your authentication API here
    setTimeout(() => {
      console.log('Form submitted:', form);
      setIsSubmitting(false);
      
      // Mock successful authentication/registration
      // In a real app, you would redirect the user or show success message
      alert(form.isSignUp ? 'Account created successfully!' : 'Login successful!');
    }, 1500);
  };

  // List of Moroccan cities for the dropdown
  const moroccanCities = [
    'Casablanca',
    'Rabat',
    'Marrakech',
    'Fez',
    'Tangier',
    'Agadir',
    'Meknes',
    'Oujda',
    'Kenitra',
    'Tetouan'
  ].sort();

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-secondary/30 animate-fade-in">
      <div className="max-w-md mx-auto">
        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
          {/* Form Header */}
          <div className="flex border-b border-border">
            <button
              className={cn(
                "flex-1 px-6 py-4 text-center font-medium transition-colors",
                !form.isSignUp ? "bg-primary text-white" : "hover:bg-secondary/50"
              )}
              onClick={() => form.isSignUp && toggleSignUp()}
            >
              Login
            </button>
            <button
              className={cn(
                "flex-1 px-6 py-4 text-center font-medium transition-colors",
                form.isSignUp ? "bg-primary text-white" : "hover:bg-secondary/50"
              )}
              onClick={() => !form.isSignUp && toggleSignUp()}
            >
              Sign Up
            </button>
          </div>
          
          {/* Form Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {/* Sign Up Fields */}
              {form.isSignUp && (
                <>
                  {/* Name Field */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                      <input
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleInputChange}
                        className={cn(
                          "w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20",
                          formErrors.name ? "border-red-300" : "border-input"
                        )}
                      />
                    </div>
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {formErrors.name}
                      </p>
                    )}
                  </div>
                  
                  {/* Business Name Field */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Business Name</label>
                    <input
                      type="text"
                      name="businessName"
                      placeholder="Your optical business name"
                      value={form.businessName}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20",
                        formErrors.businessName ? "border-red-300" : "border-input"
                      )}
                    />
                    {formErrors.businessName && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {formErrors.businessName}
                      </p>
                    )}
                  </div>
                  
                  {/* Phone Field */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+212 555-123456"
                      value={form.phone}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20",
                        formErrors.phone ? "border-red-300" : "border-input"
                      )}
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                  
                  {/* City Field */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">City</label>
                    <select
                      name="city"
                      value={form.city}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none bg-transparent",
                        formErrors.city ? "border-red-300" : "border-input"
                      )}
                    >
                      <option value="">Select your city</option>
                      {moroccanCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {formErrors.city && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {formErrors.city}
                      </p>
                    )}
                  </div>
                  
                  {/* Bio Field */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Business Description</label>
                    <textarea
                      name="bio"
                      placeholder="Brief description of your optical business"
                      value={form.bio}
                      onChange={handleInputChange}
                      rows={3}
                      className={cn(
                        "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none",
                        formErrors.bio ? "border-red-300" : "border-input"
                      )}
                    />
                    {formErrors.bio && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {formErrors.bio}
                      </p>
                    )}
                  </div>
                </>
              )}
              
              {/* Common Fields */}
              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20",
                    formErrors.email ? "border-red-300" : "border-input"
                  )}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {formErrors.email}
                  </p>
                )}
              </div>
              
              {/* Password Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Your password"
                    value={form.password}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20",
                      formErrors.password ? "border-red-300" : "border-input"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {formErrors.password}
                  </p>
                )}
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-3 rounded-lg bg-primary text-white font-medium transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/20",
                  isSubmitting && "opacity-70 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  form.isSignUp ? "Create Account" : "Login"
                )}
              </button>
            </form>
            
            {/* Form Footer */}
            {!form.isSignUp && (
              <div className="mt-4 text-center">
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot your password?
                </a>
              </div>
            )}
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            By using this service, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
