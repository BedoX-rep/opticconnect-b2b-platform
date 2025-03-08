
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';

const Login = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    businessName: '',
    phone: '',
    city: '',
    bio: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      await signIn(formData.email, formData.password);
      navigate('/profile');
    } catch (error) {
      // Error is already handled in the auth hook
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form fields
    if (!formData.email || !formData.password || !formData.businessName || 
        !formData.phone || !formData.city || !formData.bio) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      await signUp(formData.email, formData.password, {
        businessName: formData.businessName,
        phone: formData.phone,
        city: formData.city,
        bio: formData.bio,
      });
      
      // Reset form and go to login
      setFormData({
        email: '',
        password: '',
        businessName: '',
        phone: '',
        city: '',
        bio: '',
      });
      setActiveTab('login');
      
    } catch (error) {
      // Error is already handled in the auth hook
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Welcome to OpticConnect
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {activeTab === 'login' 
              ? 'Sign in to access your distributor account' 
              : 'Register as a new eyewear distributor'}
          </p>
        </div>

        <Tabs 
          defaultValue="login" 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as 'login' | 'signup')}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <div className="mt-8 bg-card shadow-sm rounded-lg p-6 border">
              <form className="space-y-6" onSubmit={handleLoginSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email address</Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative mt-1">
                      <Input
                        id="login-password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </form>
            </div>
          </TabsContent>
          
          <TabsContent value="signup">
            <div className="mt-8 bg-card shadow-sm rounded-lg p-6 border">
              <form className="space-y-6" onSubmit={handleSignupSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input
                      id="business-name"
                      name="businessName"
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Business Description</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      required
                      value={formData.bio}
                      onChange={handleChange}
                      className="mt-1"
                      rows={4}
                      placeholder="Tell retailers about your business..."
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create account'
                  )}
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
