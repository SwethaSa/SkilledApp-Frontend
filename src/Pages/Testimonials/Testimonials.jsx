import React from "react";
import "./Testimonial.css";

function Testimonials() {
  return (
    <section className="testimonial-wrapper">
      <h2 className="testimonial-title">Testimonials</h2>
      <p className="testimonial-description">
        Real stories from real learners who've grown with Skill'ED
      </p>

      <div className="testimonial-cards">
        <div className="testimonial-card fade-in">
          <p className="testimonial-text">
            “Skill'ED made learning fun again! I never thought coding could feel
            this easy.”
          </p>
          <h4 className="testimonial-name">— Aarav S</h4>
        </div>
        <div className="testimonial-card fade-in delay-1">
          <p className="testimonial-text">
            “Clean UI, short lessons. I finally found a platform that fits my
            rhythm.”
          </p>
          <h4 className="testimonial-name">— Basil</h4>
        </div>
        <div className="testimonial-card fade-in delay-2">
          <p className="testimonial-text">
            “Peaceful and perfect yoga sessions — it's now part of my daily
            habit.”
          </p>
          <h4 className="testimonial-name">— Bharathi</h4>
        </div>
        <div className="testimonial-card fade-in delay-3">
          <p className="testimonial-text">
            “Simple. Clear. Beginner-friendly. This is what every learning app
            should be.”
          </p>
          <h4 className="testimonial-name">— Varun</h4>
        </div>
        <div className="testimonial-card fade-in delay-4">
          <p className="testimonial-text">
            “It keeps me consistent without overwhelming me. Just perfect.”
          </p>
          <h4 className="testimonial-name">— Swetha</h4>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
