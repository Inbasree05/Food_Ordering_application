import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Future routes will go here */}
            <Route path="/login" element={<div className="p-8 text-center mt-20">Login Page Placeholder</div>} />
            <Route path="/register" element={<div className="p-8 text-center mt-20">Register Page Placeholder</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
