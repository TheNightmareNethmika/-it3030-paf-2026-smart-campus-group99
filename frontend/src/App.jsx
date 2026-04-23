import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReportIssuePage from "./pages/ReportIssuePage";
import MyReportsPage from "./pages/MyReportsPage";
import IssueDetailPage from "./pages/IssueDetailPage";
import FeaturedPage from "./pages/FeaturedPage";
import AdminPage from "./pages/AdminPage";
import ResourcesPage from "./pages/ResourcesPage";
import BookingPage from "./pages/BookingPage";




function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/report" element={<ReportIssuePage />} />
      <Route path="/my-reports" element={<MyReportsPage />} />
      <Route path="/issues/:id" element={<IssueDetailPage />} />
      <Route path="/featured" element={<FeaturedPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/booking" element={<BookingPage />} /> 
     
    </Routes>
  );
}

export default App;