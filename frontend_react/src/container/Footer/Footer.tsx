import React, { useState } from 'react';
import { client } from '../../client';
import images from '../../constants/images';
import AppWrap from '../../wrapper/AppWrap';
import MotionWrap from '../../wrapper/MotionWrap';
import './Footer.scss';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name,
      email,
      message,
    };

    client.create(contact).then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    });

    setLoading(false);
  };

  return (
    <>
      <h2 className="head-text">Take a coffe & and chat with me</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:emilie@tonnessen.com" className="p-text">
            emilie@tonnessen.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +47 99168210" className="p-text">
            +47 99168210
          </a>
        </div>
      </div>

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              type="text"
              className="p-text"
              placeholder="Your Name"
              value={name}
              onChange={handleChangeInput}
              name="name"
            />
          </div>

          <div className="app__flex">
            <input
              type="email"
              className="p-text"
              placeholder="Your Email"
              value={email}
              onChange={handleChangeInput}
              name="email"
            />
          </div>

          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button className="p-text" type="button" onClick={handleSubmit}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in touch</h3>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg'
);
