import './App.css';
import React, { useState } from 'react';
import ALDPrediction from './Components/ALDPrediction.js';
import NAFLDPrediction from './Components/NAFLDPrediction';
import Navbar from './Components/Navbar.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ALDResultPage from './Components/ALDResult.js'; // ALD Result Page
import NAFLDResultPage from './Components/NAFLDResult'; // NAFLD Result Page
import Dashboard from './Components/Dashboard.js';
import Footer from './Components/Footer.js';
import About from './Components/About.js';
import Contact from './Components/Contact.js';

function App() {
  const [formType, setFormType] = useState('ALD'); // Default form

  return (

    <Router>
    <Navbar />
    <div className="pt-24">
      <Routes>
        {/* Routes for other pages */}

        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/result" element={<ALDResultPage />} />
        <Route path="/nafld-result" element={<NAFLDResultPage />} />

        {/* Default route */}
        <Route
          path="/"
          element={
            <>
              <header className="text-center py-4">
                <h1 className="text-3xl font-bold mb-4">Liver Disease Prediction</h1>
                <div className="flex justify-center gap-4 mb-6">
                  <button
                    onClick={() => setFormType('ALD')}
                    className={`px-4 py-2 text-white rounded ${
                      formType === 'ALD' ? 'bg-blue-600' : 'bg-gray-400'
                    }`}
                  >
                    Alcoholic Liver Disease (ALD)
                  </button>
                  <button
                    onClick={() => setFormType('NAFLD')}
                    className={`px-4 py-2 text-white rounded ${
                      formType === 'NAFLD' ? 'bg-blue-600' : 'bg-gray-400'
                    }`}
                  >
                    Non-Alcoholic Fatty Liver Disease (NAFLD)
                  </button>
                </div>
              </header>
              <main className="container mx-auto">
                <div className="mb-10">
                  {formType === 'ALD' ? <ALDPrediction /> : <NAFLDPrediction />}
                </div>
                <div className="mt-10">
                  <Dashboard />
                </div>
                <div className="mt-10">
                  <Footer />
                </div>
              </main>
            </>
          }
        />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
