import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ResourceListPage from "./pages/ResourceListPage";
import ResourceFormPage from "./pages/ResourceFormPage";
import ReportIssuePage from "./pages/ReportIssuePage";
import MyReportsPage from "./pages/MyReportsPage";
import IssueDetailPage from "./pages/IssueDetailPage";
import FeaturedPage from "./pages/FeaturedPage";
import AdminPage from "./pages/AdminPage";
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ResourceListPage />} />
          <Route path="/resources" element={<ResourceListPage />} />
          <Route path="/resources/add" element={<ResourceFormPage />} />
          <Route path="/resources/edit/:id" element={<ResourceFormPage />} />
          <Route path="/report" element={<ReportIssuePage />} />
          <Route path="/my-reports" element={<MyReportsPage />} />
          <Route path="/issues/:id" element={<IssueDetailPage />} />
          <Route path="/featured" element={<FeaturedPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;