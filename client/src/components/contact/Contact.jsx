import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './contact.css';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneN, setPhoneN] = useState('');
  const [message, setMessage] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5500/send-email', {
        name: name,
        email: email,
        phoneN: phoneN,
        message: message,
      });
      if (data.status === 'success') {
        toast.success(data.message);
        setName('');
        setEmail('');
        setPhoneN('');
        setMessage('');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className='contact-container'>
      <div className='contact-box'>
        <div className='left'>
          <h2>Get in Touch</h2>
          <p>
            Tell us how we can help you reach your most important objectives
          </p>
        </div>
        <form onSubmit={submitForm} className='right'>
          <label>Name*</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type='text'
            className='field'
            placeholder=''
            id=''
            required
          />
          <label>Email*</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type='email'
            className='field'
            placeholder=''
            id=''
            required
          />
          <label>Phone Number*</label>
          <input
            onChange={(e) => setPhoneN(e.target.value)}
            value={phoneN}
            type='text'
            className='field'
            placeholder=''
            id=''
            required
          />
          <label>Message*</label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className='field'
            placeholder='How can we help you?'
            cols='30'
            rows='10'
            required
          ></textarea>
          <button type='submit' className='contact-btn'>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
