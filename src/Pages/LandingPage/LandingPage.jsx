import React from "react";
import ScrollSection from "../../Components/ScrollSection/ScrollSection";
import "./LandingPage.css";

import OfferImg from "/assets/offer.svg";
import WhyImg from "/assets/why.svg";
import JoinImg from "/assets/join.svg";
import TopPicsPage from "../TopPicks/TopPicsPage";
import Testimonials from "../Testimonials/Testimonials";
import Contact from "../Contact/Contact";

function LandingPage() {
  return (
    <div id="home" className="landing-page">
      <div className="auth-buttons">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>

      <div className="content-wrapper">
        <div className="text-content">
          <h1 className="title">Skill'ED</h1>
          <h3 className="tagline">Where Skills Get Ed-ucated</h3>
          <button className="get-started">Get Started</button>
        </div>

        <img
          className="landing-svg"
          src="/assets/one.svg"
          alt="Landing Illustration"
        />
      </div>

      <img className="ellipse-one" src="/assets/Ellipse1.svg" alt="Ellipse" />

      <ScrollSection
        title="What We Offer"
        description="Skill'ED is built for the fast-paced, focus-driven learner. We offer micro-learning modules that fit into your daily life, curated skill tracks that help you level up in areas that matter, and practical quizzes to reinforce real knowledge. With a Gen Z twist, everything’s designed to feel fresh — from relatable mentors to a clutter-free learning vibe."
        image={OfferImg}
        altText="We Offer"
        imagePosition="left"
        backgroundColor="new"
      />

      <ScrollSection
        title="Why Skill'Ed"
        description="Because we get you. Skill'ED isn’t just another learning app—it’s your personal growth space. Whether you’re juggling classes, jobs, or just exploring your passions, we help you learn at your own pace. No pressure, no jargon—just real progress, clean design, and content you’ll actually care about."
        image={WhyImg}
        altText="Skilled"
        imagePosition="right"
        backgroundColor="old"
      />

      <ScrollSection
        title="Who Can Join?"
        description="Anyone with the hunger to learn or the passion to teach. Whether you’re a curious student wanting to build your skill stack or a mentor eager to guide the next wave of learners—Skill'ED gives you a home. Choose your path, and let’s build something awesome together."
        image={JoinImg}
        altText="Join us"
        imagePosition="left"
        backgroundColor="new"
      />
      <TopPicsPage />
      <Testimonials />
      <Contact />
    </div>
  );
}

export default LandingPage;
