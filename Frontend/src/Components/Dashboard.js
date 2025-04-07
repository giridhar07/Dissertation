import React from 'react';
import ClinicImage from '../Assets/clinicImage.jpg';

const Dashboard = () => {

  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={ClinicImage} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#003da5] font-bold text-2xl'>Liver Check</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>The Alcoholic Liver Disease/
            Nonalcoholic Fatty Liver Disease Predictor</h1>
          <p>
          The results should not be used alone to determine medical treatment. 
          This tool is a ML based model and is not a substitute for an individual treatment plan developed by a health care provider with personal knowledge of a specific patient. 
          Factors such as medical history and the health care provider’s experience, knowledge, and training must also be considered.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;