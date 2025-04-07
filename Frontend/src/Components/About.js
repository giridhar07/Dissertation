import React from 'react';

const About = () => {
  return (
    <div className="max-w-[1240px] mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-[#003da5] text-center mb-6">About Us</h1>
      <p className="text-lg text-gray-700 mb-4">
        At LiverCheck, we are dedicated to improving lives through accurate and timely diagnosis of liver conditions.
        Our team of healthcare professionals and technology experts work together to deliver reliable clinical solutions.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        We specialize in testing for:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Alcoholic Liver Disease (ALD)</li>
        <li>Non-Alcoholic Fatty Liver Disease (NAFLD)</li>
        <li>Comprehensive liver function panels</li>
      </ul>
      <p className="text-lg text-gray-700">
        Our mission is to empower individuals to take charge of their liver health through state-of-the-art diagnostics
        and personalized guidance.
      </p>
    </div>
  );
};

export default About;