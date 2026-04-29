import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './member3/pages/HomePage';
import ReportIssuePage from './member3/pages/ReportIssuePage';
import MyReportsPage from './member3/pages/MyReportsPage';
import IssueDetailPage from './member3/pages/IssueDetailPage';
import FeaturedPage from './member3/pages/FeaturedPage';
import AdminPage from './member3/pages/AdminPage';
import TechnicianPage from './member3/pages/TechnicianPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const M3_ROLES = ['USER', 'ADMIN', 'TECHNICIAN'];

/**
 * member-3 helpdesk UI (issue reporting, admin/technician consoles), mounted at /m3/*.
 */
export default function Member3App() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <div className="flex-1 flex flex-col w-full min-w-0">
        <Routes>
          <Route index element={<HomePage />} />
          <Route
            path="report"
            element={
              <ProtectedRoute allowedRoles={M3_ROLES}>
                <ReportIssuePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-reports"
            element={
              <ProtectedRoute allowedRoles={M3_ROLES}>
                <MyReportsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="issues/:id"
            element={
              <ProtectedRoute allowedRoles={M3_ROLES}>
                <IssueDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="featured"
            element={
              <ProtectedRoute allowedRoles={M3_ROLES}>
                <FeaturedPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="technician"
            element={
              <ProtectedRoute allowedRoles={['TECHNICIAN']}>
                <TechnicianPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
