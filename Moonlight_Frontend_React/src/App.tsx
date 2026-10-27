// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./styles/global.css";
import { BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import { AppRoutesAdmin } from "./routes/AppRoutesAdmin.tsx";
import { AppRoutesCustomer } from "./routes/AppRoutesCustomer.tsx";
import { setNavigate } from "./utils/navigate/navigate.ts";
import { CartProvider } from "./contexts/CartContext.tsx";
import { LibraryProvider } from "./contexts/LibraryContext.tsx";
import { ScrollToTop } from "./components/ScrollToTop.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";

function AppRoutes() {
  const navigate = useNavigate();
  setNavigate(navigate);

  return (
    <Routes>
      {AppRoutesCustomer}
      {AppRoutesAdmin}
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ScrollToTop />
        <LibraryProvider>
          <CartProvider>
              <AppRoutes />
          </CartProvider>
        </LibraryProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
