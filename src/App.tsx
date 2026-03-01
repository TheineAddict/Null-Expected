import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Mission from './pages/Mission';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AuthorBlog from './pages/AuthorBlog';
import Manifesto from './pages/Manifesto';
import Consulting from './pages/Consulting';
import NotFound from './pages/NotFound';
import JobRadarApp from './pages/JobRadarApp';
import CharacterSheetApp from './pages/CharacterSheetApp';
import { CharacterSheetPage } from './pages/CharacterSheetApp';
import AppPrivacyPolicy from './pages/AppPrivacyPolicy';
import AppTermsOfService from './pages/AppTermsOfService';

// Component to handle scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isAppSection =
    location.pathname === '/null-expected-job-radar-app' || location.pathname.startsWith('/character-sheet-app');
  const isLegalPage = location.pathname === '/app-privacy-policy' || location.pathname === '/app-terms-of-service';
  const hideNavigation = isAppSection || isLegalPage;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {!hideNavigation && (
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-900 focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>
      )}
      {!hideNavigation && <Header />}
      <div id="main-content" className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blog/author/:authorSlug" element={<AuthorBlog />} />
          <Route path="/manifesto" element={<Manifesto />} />
          <Route path="/consulting" element={<Consulting />} />
          <Route path="/null-expected-job-radar-app" element={<JobRadarApp />} />
          <Route path="/character-sheet-app" element={<CharacterSheetApp />} />
          <Route path="/character-sheet-app/:characterId" element={<CharacterSheetPage />} />
          <Route path="/app-privacy-policy" element={<AppPrivacyPolicy />} />
          <Route path="/app-terms-of-service" element={<AppTermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!hideNavigation && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;