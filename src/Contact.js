// Contact.js

import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    // Simulate sending an email (replace with actual email sending logic)
    console.log(`Email sent to inquiries@gmail.com\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
  };

  return (
    <div className="contact-container" style={{ textAlign: "center", padding: "20px", maxWidth: '90%', margin: 'auto', border: '2px solid #ccc', borderRadius: '7px' }}>
      <h2>Contact Us</h2>
      <p>Have questions, suggestions, or just want to say hello? We'd love to hear from you!</p>
      <p>Email: contact@colorx.com</p>
	  <p style={{ color: 'red' }}>Note that this is just an experimental contact form. Do not use it!</p>

      <div className="contact-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="message">Message:</label>
        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Contact;
