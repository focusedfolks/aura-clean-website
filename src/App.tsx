import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { CartDrawer } from "./components/CartDrawer";
import { Footer } from "./components/Footer";
import { InstallPrompt } from "./components/InstallPrompt";
import { OfferPosterPopup } from "./components/OfferPosterPopup";
import { Nav } from "./components/Nav";
import { CartProvider } from "./context/CartContext";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { OffersPage } from "./pages/OffersPage";
import { ProductPage } from "./pages/ProductPage";
import { WhyPage } from "./pages/WhyPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Nav />
        <CartDrawer />
        <OfferPosterPopup />
        <InstallPrompt />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/why" element={<WhyPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}
