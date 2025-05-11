import React, { useState } from "react";
import "./Contact.css";
import { HashLink } from "react-router-hash-link";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Message sent successfully!");
      } else {
        alert("Failed to send message: " + data.message);
      }

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      alert("Error sending message.");
      console.error(error);
    }
  };

  return (
    <>
      <section id="contact">
        <div className="contact-container">
          <div className="contact-wrapper">
            <h2 className="contact-title">Contact Us</h2>
            <p className="contact-description">
              We would love to hear from you! Please fill out the form below and
              we will get back to you as soon as possible.
            </p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                placeholder="Email"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <textarea
                placeholder="Message"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit">Send Message</button>
            </form>
          </div>
          <div className="img-container">
            <img
              src="/assets/contact.svg"
              alt="Contact Us"
              className="contact-image"
            />
          </div>
        </div>
      </section>

      <section>
        <footer className="footer">
          <div className="footer-left">
            <HashLink smooth to="/#home">
              <h2 className="title">Skill'ED</h2>
            </HashLink>
          </div>
          <div className="footer-right">
            <HashLink smooth to="/#home">
              Home
            </HashLink>
            <HashLink smooth to="/#about">
              About
            </HashLink>
            <HashLink smooth to="/#toppics">
              Top Pics
            </HashLink>
            <HashLink smooth to="/#contact">
              Contact
            </HashLink>
          </div>
        </footer>
      </section>
    </>
  );
}

export default Contact;
