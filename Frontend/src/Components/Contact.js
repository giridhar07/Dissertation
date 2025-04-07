import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
    alert('Thank you for reaching out! We will get back to you soon.');
  };

  return (
    <div className="max-w-[1240px] mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-[#003da5] text-center mb-6">Contact Us</h1>
      <p className="text-lg text-gray-700 text-center mb-8">
        Have questions or need assistance? Feel free to reach out to us.
      </p>
      <form className="max-w-[600px] mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
            rows="5"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-md font-medium w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
