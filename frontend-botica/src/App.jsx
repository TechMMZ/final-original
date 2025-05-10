import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("token");

  return (
    <>
      {/* Solo muestra Navbar si está logueado y no está en / */}
      {isLoggedIn && location.pathname !== "/" && <Navbar />}
      <main className="min-h-screen px-4 py-6">
        <ScrollToTop />
        <AppRoutes />
      </main>
    </>
  );
}

export default App;
