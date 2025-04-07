import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NAFLDPrediction() {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    weight: '',
    height: '',
    bmi: '',
    futime: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let key in formData) {
      if (formData[key] === '') {
        alert(`Please fill out the ${key} field.`);
        return;
      }

      if (isNaN(Number(formData[key]))) {
        alert(`${key} must be a valid number.`);
        return;
      }
    }

    // Validate age range
    const age = Number(formData.age);
    if (age < 18 || age > 98) {
      alert('Age must be between 18 and 98.');
      return;
    }

    try {
      const response = await fetch('/predict/nafld', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log('API Response:', result);

      if (result && result.prediction !== undefined && result.probability_of_disease !== undefined && 
        result.risk_category !== undefined) {
        navigate('/nafld-result', {
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
    <div className="bg-white p-8 rounded shadow-md max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">NAFLD Prediction Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-6">
          {/* Age and Gender */}
          <div>
            <label className="block font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              placeholder="18 to 98 years"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Gender</label>
            <input
              type="number"
              name="gender"
              placeholder="1 - Male, 0 - Female"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Weight and Height */}
          <div>
            <label className="block font-medium text-gray-700">Weight</label>
            <input
              type="number"
              name="weight"
              placeholder="33.4 to 181.7 kg"
              value={formData.weight}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Height</label>
            <input
              type="number"
              name="height"
              placeholder="123 to 215 cm"
              value={formData.height}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* BMI and FU time */}
          <div>
            <label className="block font-medium text-gray-700">BMI</label>
            <input
              type="number"
              name="bmi"
              placeholder="9.21 to 84.40"
              value={formData.bmi}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">FU time</label>
            <input
              type="number"
              name="futime"
              placeholder="7 to 7268 Days"
              value={formData.futime}
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

export default NAFLDPrediction;
