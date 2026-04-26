import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AdminUserManagement from './pages/AdminUserManagement';
import AdminBookingManagement from './pages/AdminBookingManagement';
import UserDashboard from './pages/UserDashboard';
import UserResourceCatalogue from './pages/UserResourceCatalogue';
import UserProfile from './pages/UserProfile';
import NotificationsPage from './pages/NotificationsPage';
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler';
import AccessDenied from './pages/AccessDenied';
import ProtectedRoute from './components/ProtectedRoute';
import ResourceListPage from './pages/ResourceListPage';
import ResourceFormPage from './pages/ResourceFormPage';
import Member3App from './Member3App';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/m3/*" element={<Member3App />} />
          <Route path="/support" element={<Navigate to="/m3" replace />} />
          <Route path="/admin/tickets" element={<Navigate to="/m3/admin" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route 
            path="/admin-dashboard" 
            element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/admin" 
            element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/admin/users" 
            element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminUserManagement /></ProtectedRoute>} 
          />
          <Route 
            path="/admin/bookings" 
            element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminBookingManagement /></ProtectedRoute>} 
          />
          <Route 
            path="/user-dashboard" 
            element={<ProtectedRoute allowedRoles={['USER', 'ADMIN', 'TECHNICIAN']}><UserDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/book" 
            element={<ProtectedRoute allowedRoles={['USER', 'ADMIN', 'TECHNICIAN']}><UserResourceCatalogue /></ProtectedRoute>} 
          />
          <Route 
            path="/profile" 
            element={<ProtectedRoute allowedRoles={['USER', 'ADMIN', 'TECHNICIAN']}><UserProfile /></ProtectedRoute>} 
          />
          <Route 
            path="/notifications" 
            element={<ProtectedRoute allowedRoles={['USER', 'ADMIN', 'TECHNICIAN']}><NotificationsPage /></ProtectedRoute>} 
          />
          {/* Member-1: Resource Management Routes */}
          <Route 
            path="/resources" 
            element={<ProtectedRoute allowedRoles={['ADMIN']}><ResourceListPage /></ProtectedRoute>} 
          />
          <Route 
            path="/admin/resources" 
            element={<ProtectedRoute allowedRoles={['ADMIN']}><ResourceListPage /></ProtectedRoute>} 
          />
          <Route 
            path="/resources/add" 
            element={<ProtectedRoute allowedRoles={['ADMIN']}><ResourceFormPage /></ProtectedRoute>} 
          />
          <Route 
            path="/resources/edit/:id" 
            element={<ProtectedRoute allowedRoles={['ADMIN']}><ResourceFormPage /></ProtectedRoute>} 
          />

          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
          <Route path="/access-denied" element={<AccessDenied />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
