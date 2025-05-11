import React, { useState } from "react";
import "./Contact.css";
import { HashLink } from "react-router-hash-link";
import { Toaster, toast } from "react-hot-toast";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const toastOptions = {
    style: {
      border: "1px solid #ff5733",
      padding: "14px 16px",
      color: "#fff",
      background: "#ff5733",
      borderRadius: "10px",
      fontWeight: "500",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#F0EBFF",
    },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API = import.meta.env.VITE_API;

    try {
      await toast.promise(
        fetch(`${API}/users/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }).then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Failed to send message");
          }
        }),
        {
          loading: "Sending message...",
          success: "Message sent successfully!",
          error: (err) => `Error: ${err.message}`,
        },
        toastOptions
      );

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
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
