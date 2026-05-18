import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Wallet from "./pages/Wallet";
import Exchange from "./pages/Exchange";
import Gold from "./pages/Gold";
import Crypto from "./pages/Crypto";
import AIAssistant from "./pages/AIAssistant";
import SocialPayments from "./pages/SocialPayments";
import WatchDemo from "./pages/WatchDemo";
import Contact from "./pages/Contact";
import EarlyAccess from "./pages/EarlyAccess";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/gold" element={<Gold />} />
          <Route path="/crypto" element={<Crypto />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/social-payments" element={<SocialPayments />} />
          <Route path="/watch-demo" element={<WatchDemo />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/early-access" element={<EarlyAccess />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
