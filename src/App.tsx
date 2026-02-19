import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from '@/context/CartContext';
import { KaayuToastProvider } from '@/context/ToastContext';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SearchOverlay from '@/components/SearchOverlay';
import BackToTop from '@/components/BackToTop';
import Index from "./pages/Index";
import About from "./pages/About";
import CollectionPage from "./pages/CollectionPage";
import ProductPage from "./pages/ProductPage";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <KaayuToastProvider>
            <BrowserRouter>
              <AnnouncementBar />
              <Navbar onSearchOpen={() => setSearchOpen(true)} />
              <CartDrawer />
              <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/collection/:slug" element={<CollectionPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
              <BackToTop />
            </BrowserRouter>
          </KaayuToastProvider>
        </CartProvider>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
