import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "./components/Layout";
import { AppShell } from "./components/AppShell";
import { StoreProvider } from "./lib/store";
import Home from "./Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import EarlyAccess from "./pages/EarlyAccess";
import WatchDemo from "./pages/WatchDemo";

import Dashboard from "./pages/app/Dashboard";
import BillyHub from "./pages/app/Billy";
import Wallets from "./pages/app/Wallets";
import SendPage from "./pages/app/Send";
import ConvertPage from "./pages/app/Convert";
import TransactionsPage from "./pages/app/Transactions";
import CardsPage from "./pages/app/Cards";
import SavingsPage from "./pages/app/Savings";
import GoldPage from "./pages/app/GoldPage";
import CryptoPage from "./pages/app/CryptoPage";
import ProfilePage from "./pages/app/Profile";

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Toaster theme="dark" position="top-center" richColors />
        <Routes>
          {/* Authenticated app */}
          <Route path="/app" element={<AppShell />}>
            <Route index element={<Dashboard />} />
            <Route path="billy" element={<BillyHub />} />
            <Route path="wallets" element={<Wallets />} />
            <Route path="send" element={<SendPage />} />
            <Route path="convert" element={<ConvertPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="cards" element={<CardsPage />} />
            <Route path="savings" element={<SavingsPage />} />
            <Route path="gold" element={<GoldPage />} />
            <Route path="crypto" element={<CryptoPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Public marketing + auth */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/signin" element={<Layout><SignIn /></Layout>} />
          <Route path="/signup" element={<Layout><SignUp /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/early-access" element={<Layout><EarlyAccess /></Layout>} />
          <Route path="/watch-demo" element={<Layout><WatchDemo /></Layout>} />
          <Route path="*" element={<Layout><Home /></Layout>} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
