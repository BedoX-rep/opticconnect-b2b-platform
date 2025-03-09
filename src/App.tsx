import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import UserNavbar from "@/components/UserNavbar";
import Index from "./pages/Index";
import Distributors from "./pages/Distributors";
import DistributorDetail from "./pages/DistributorDetail";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import ProductManagement from "./pages/ProductManagement";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// App Layout component with navigation
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background animated-bg">
      <UserNavbar />
      <main className="flex-grow pt-16 pb-8">
        {children}
      </main>
      <footer className="py-6 border-t border-border/50">
        <div className="container flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 sm:mb-0">
            © {new Date().getFullYear()} All rights reserved
          </div>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <AppLayout>
                  <Index />
                </AppLayout>
              } 
            />
            <Route 
              path="/distributors" 
              element={
                <AppLayout>
                  <Distributors />
                </AppLayout>
              } 
            />
            <Route 
              path="/distributors/:id" 
              element={
                <AppLayout>
                  <DistributorDetail />
                </AppLayout>
              } 
            />
            <Route 
              path="/products" 
              element={
                <AppLayout>
                  <Products />
                </AppLayout>
              } 
            />
            <Route 
              path="/products/:id" 
              element={
                <AppLayout>
                  <ProductDetail />
                </AppLayout>
              } 
            />
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Profile />
                  </AppLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/manage-products" 
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <ProductManagement />
                  </AppLayout>
                </ProtectedRoute>
              } 
            />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;