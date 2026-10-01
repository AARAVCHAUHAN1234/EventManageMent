import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Context Providers
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Student Pages
import { Home } from './pages/student/Home';
import { Events } from './pages/student/Events';
import { EventDetails } from './pages/student/EventDetails';
import { Register } from './pages/student/Register';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminEvents } from './pages/admin/AdminEvents';
import { AddEvent } from './pages/admin/AddEvent';
import { EditEvent } from './pages/admin/EditEvent';
import { AdminRegistrations } from './pages/admin/AdminRegistrations';

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Layout wrapper for student facing pages
function StudentLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#0c0c0c] text-[#F6F3EC]">
      <Navbar />
      <main className="flex-1 bg-[#0c0c0c]">{children}</main>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <EventProvider>
            <ScrollToTop />
            <Routes>
              {/* Student Routes */}
              <Route
                path="/"
                element={
                  <StudentLayout>
                    <Home />
                  </StudentLayout>
                }
              />
              <Route
                path="/events"
                element={
                  <StudentLayout>
                    <Events />
                  </StudentLayout>
                }
              />
              <Route
                path="/events/:id"
                element={
                  <StudentLayout>
                    <EventDetails />
                  </StudentLayout>
                }
              />
              <Route
                path="/register/:eventId"
                element={
                  <StudentLayout>
                    <Register />
                  </StudentLayout>
                }
              />

              {/* Admin Login */}
              <Route
                path="/admin/login"
                element={
                  <StudentLayout>
                    <AdminLogin />
                  </StudentLayout>
                }
              />

              {/* Admin Protected Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/events"
                element={
                  <ProtectedRoute>
                    <AdminEvents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/events/new"
                element={
                  <ProtectedRoute>
                    <AddEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/events/edit/:id"
                element={
                  <ProtectedRoute>
                    <EditEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/registrations"
                element={
                  <ProtectedRoute>
                    <AdminRegistrations />
                  </ProtectedRoute>
                }
              />

              {/* Fallback 404 Route */}
              <Route
                path="*"
                element={
                  <StudentLayout>
                    <div className="max-w-lg mx-auto py-24 text-center px-4 space-y-5 vintage-noise">
                      <div className="inline-block px-3.5 py-1 rounded-full bg-[#181818] border border-white/10 text-[#ECE5D8] text-[10px] font-mono uppercase tracking-widest">
                        [ 404 // NOT FOUND ]
                      </div>
                      <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#F6F3EC] tracking-tight">
                        Page Not Found
                      </h2>
                      <p className="text-xs sm:text-sm text-[#A69E8C] max-w-sm mx-auto font-sans font-light">
                        The campus link you are attempting to visit does not exist or has been archived.
                      </p>
                      <div className="pt-2">
                        <a
                          href="/"
                          className="inline-flex px-6 py-3 rounded-xl bg-[#F6F3EC] hover:bg-white text-[#141414] font-mono font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
                        >
                          Return to Home
                        </a>
                      </div>
                    </div>
                  </StudentLayout>
                }
              />
            </Routes>
          </EventProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
