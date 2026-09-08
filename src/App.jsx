import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "./components/ScrollToTop";
import GuigaNavbar from "@/components/GuigaNavbar";
import BottomTabBar from "@/components/BottomTabBar";

const Home = lazy(() => import("@/pages/Home"));

const PageFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-[#050505]">
    <div className="w-8 h-8 border-4 border-white/10 border-t-white/60 rounded-full animate-spin" />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
        <Suspense fallback={<PageFallback />}>
          <Routes location={location}>
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

function SiteChrome() {
  return <><GuigaNavbar /><BottomTabBar /></>;
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" enableSystem={false} attribute="class">
      <Router>
        <ScrollToTop />
        <SiteChrome />
        <AnimatedRoutes />
      </Router>
    </ThemeProvider>
  );
}
