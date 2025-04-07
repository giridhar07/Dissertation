import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const ALDResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the prediction result and risk category from the location state
  const { prediction, probability_of_disease, risk_category } = location.state || {};

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <nav className="w-full bg-blue-500 py-4 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white font-bold text-xl">Liver Disease Prediction</h1>
        </div>
      </nav>
      <div className="mt-8 p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-center mb-4">Results</h2>
        {prediction === 1 ? (

          <div className="text-center">
          <h3 className="text-red-600 text-lg font-semibold">
            Chances of having Liver Disease is more, please consult a Doctor.
          </h3>
          <img
              src="https://cdn.pixabay.com/photo/2021/11/20/03/16/doctor-6810750_1280.png"
              alt="Doctor"
              className="mt-6 mx-auto"
              width={350}
              height={250}
            />

        </div>
        ) : (
          <div className="text-center">
            <h3 className="text-green-600 text-lg font-semibold">
            Your test results show no signs of liver disease. Thank you for prioritizing your health.
            </h3>
            
            <img
              src="https://cdn.vectorstock.com/i/500p/27/25/young-doctor-standing-and-show-thumb-up-vector-54152725.avif"
              alt="All Good"
              className="mt-6 mx-auto"
              width={350}
              height={250}
            />
           
          </div>
        )}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-center text-gray-600 mt-2">
            Probability of Disease: <span className="text-red-500">{probability_of_disease}%</span>
          </h3>
          <h3 className="text-xl font-semibold text-center text-gray-700">
            Risk Category: <span className="text-blue-500">{risk_category}</span>
          </h3>
        </div>
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ALDResultPage;