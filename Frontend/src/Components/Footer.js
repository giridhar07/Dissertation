import React from 'react';
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-blue-500'>
      <div>
        <h1 className='w-full text-3xl font-bold text-[#003da5]'>LiverCheck.</h1>
        <p className='py-4'>
          LiverCheck provides reliable and accurate clinical testing solutions for Alcoholic Liver Disease (ALD) and Non-Alcoholic Fatty Liver Disease (NAFLD). We are committed to helping you take charge of your liver health.
        </p>
        <div className='flex justify-between md:w-[75%] my-6'>
          <FaFacebookSquare size={30} />
          <FaInstagram size={30} />
          <FaTwitterSquare size={30} />
        </div>
      </div>
      <div className='lg:col-span-2 flex justify-between mt-6'>
        <div>
          <h6 className='font-medium text-blue-500'>Services</h6>
          <ul>
            <li className='py-2 text-sm'>Liver Function Tests</li>
            <li className='py-2 text-sm'>Alcoholic Liver Disease Diagnosis</li>
            <li className='py-2 text-sm'>NAFLD Screening</li>
            <li className='py-2 text-sm'>Health Consultation</li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium text-blue-500'>Resources</h6>
          <ul>
            <li className='py-2 text-sm'>Patient Guides</li>
            <li className='py-2 text-sm'>Test Preparation Tips</li>
            <li className='py-2 text-sm'>Frequently Asked Questions</li>
            <li className='py-2 text-sm'>Liver Health Blog</li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium text-blue-500'>About Us</h6>
          <ul>
            <li className='py-2 text-sm'>Our Mission</li>
            <li className='py-2 text-sm'>Meet Our Team</li>
            <li className='py-2 text-sm'>Careers</li>
            <li className='py-2 text-sm'>Contact Us</li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium text-blue-500'>Policies</h6>
          <ul>
            <li className='py-2 text-sm'>Privacy Policy</li>
            <li className='py-2 text-sm'>Terms of Service</li>
            <li className='py-2 text-sm'>Refund Policy</li>
            <li className='py-2 text-sm'>Accessibility</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
