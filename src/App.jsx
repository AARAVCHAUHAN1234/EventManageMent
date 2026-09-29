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
                    <div className="max-w-md mx-auto py-24 text-center px-4 space-y-4">
                      <h2 className="text-3xl font-extrabold text-slate-900">404 - Page Not Found</h2>
                      <p className="text-sm text-slate-500">
                        The page you are trying to access does not exist.
                      </p>
                      <a
                        href="/"
                        className="inline-flex px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs"
                      >
                        Return Home
                      </a>
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
