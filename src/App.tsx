import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "./components/Layout";
import Home from "./Home";
import AuthPage from "./pages/Auth";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Security from "./pages/Security";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Waitlist from "./pages/Waitlist";
import Careers from "./pages/Careers";
import CareerDetail from "./pages/CareerDetail";
import TalentPool from "./pages/TalentPool";
import { AuthProvider } from "./lib/auth";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster theme="dark" position="top-center" richColors />
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/features" element={<Layout><Features /></Layout>} />
          <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
          <Route path="/security" element={<Layout><Security /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/waitlist" element={<Layout><Waitlist /></Layout>} />
          <Route path="/careers" element={<Layout><Careers /></Layout>} />
          <Route path="/careers/talent-pool" element={<Layout><TalentPool /></Layout>} />
          <Route path="/careers/:slug" element={<Layout><CareerDetail /></Layout>} />
          <Route path="*" element={<Layout><Home /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
