import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ResourceListPage from './pages/ResourceListPage'
import ResourceFormPage from './pages/ResourceFormPage'
import './styles/App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resources" element={<ResourceListPage />} />
            <Route path="/resources/add" element={<ResourceFormPage />} />
            <Route path="/resources/edit/:id" element={<ResourceFormPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
