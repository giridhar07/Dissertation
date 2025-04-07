import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ALDPrediction() {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    total_bilirubin: '',
    direct_bilirubin: '',
    alkaline_phosphotase: '',
    alamine_aminotransferase: '',
    aspartate_aminotransferase: '',
    total_proteins: '',
    albumin: '',
    albumin_and_globulin_ratio: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate age input
    if (formData.age < 18 || formData.age > 90) {
      alert('Age must be between 18 and 90.');
      return;
    }

    // Validate that all fields are non-empty and are numbers
    for (let key in formData) {
      if (formData[key] === '') {
        alert(`Please fill out the ${key.replace(/_/g, ' ')} field.`);
        return;
      }

      // Convert inputs to numbers
      if (isNaN(Number(formData[key]))) {
        alert(`${key.replace(/_/g, ' ')} must be a valid number.`);
        return;
      }
    }

    try {
      const response = await fetch('/predict/ald', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log('API Response:', result);

      if (result && result.prediction !== undefined && result.probability_of_disease !== undefined && 
         result.risk_category !== undefined) {
        // Navigate to result page with prediction and risk category
        navigate('/result', {
          state: {
            prediction: result.prediction,
            probability_of_disease: result.probability_of_disease,
            risk_category: result.risk_category
          },
      });
      } else {
        alert('Prediction not available.');
      }

      
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-md max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">ALD Prediction Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-gray-700 font-medium">Age:</label>
            <input
              type="number"
              name="age"
              placeholder="18 - 90 (years)"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-gray-700 font-medium">Gender:</label>
            <input
              type="text"
              name="gender"
              placeholder="1- Male, 0 - Female"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-gray-700 font-medium">Total Bilirubin:</label>
            <input
              type="text"
              name="total_bilirubin"
              placeholder="0.3 - 15.0 mg/dL"
              value={formData.total_bilirubin}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-gray-700 font-medium">Direct Bilirubin:</label>
            <input
              type="text"
              name="direct_bilirubin"
              placeholder="0.1 - 10.0 mg/dL"
              value={formData.direct_bilirubin}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-gray-700 font-medium">Alkaline Phosphatase (ALP):</label>
            <input
              type="text"
              name="alkaline_phosphotase"
              placeholder="30 - 1200 U/L"
              value={formData.alkaline_phosphotase}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-gray-700 font-medium">Alamine Aminotransferase (ALT)</label>
            <input
              type="text"
              name="alamine_aminotransferase"
              placeholder="7 - 1000 U/L"
              value={formData.alamine_aminotransferase}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-gray-700 font-medium">Aspartate Aminotransferase (AST):</label>
            <input
              type="text"
              name="aspartate_aminotransferase"
              placeholder="10 - 1000 U/L"
              value={formData.aspartate_aminotransferase}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-gray-700 font-medium">Total Proteins:</label>
            <input
              type="text"
              name="total_proteins"
              placeholder="5.0 - 9.0 g/dL"
              value={formData.total_proteins}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-gray-700 font-medium">Albumin:</label>
            <input
              type="text"
              name="albumin"
              placeholder="2.0 - 5.5 g/dL"
              value={formData.albumin}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-gray-700 font-medium">Albumin and Globulin Ratio (A/G Ratio):</label>
            <input
              type="text"
              name="albumin_and_globulin_ratio"
              placeholder="0.5 - 2.5"
              value={formData.albumin_and_globulin_ratio}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded hover:opacity-90"
        >
          Predict
        </button>
      </form>
    </div>
  );
}

export default ALDPrediction;

