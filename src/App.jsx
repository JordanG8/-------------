import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ArticlePage from "./pages/ArticlePage";

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <a href='#main-content' className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-[100] focus:bg-gold-400 focus:text-navy-900 focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold'>
        דלג לתוכן הראשי
      </a>
      <div className='min-h-screen bg-navy-900 text-gray-200 font-sans flex flex-col' dir='rtl'>
        <Header />
        <div className='flex-grow'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/article/:id' element={<ArticlePage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
