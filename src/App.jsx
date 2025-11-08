import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import HomePage from './components/HomePage'
import ContactPage from './components/ContactPage'

function App() {
  return (
    <Router>
      <div className="app">
        {/* Header visible on all pages */}
        <Header />

        <main className="main-content">
          <Routes>
            {/* Root path → HomePage */}
            <Route path="/" element={<HomePage />} />

            {/* Contact path → ContactPage */}
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
