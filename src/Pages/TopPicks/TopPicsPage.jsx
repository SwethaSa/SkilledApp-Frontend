import React from "react";
import "./TopPicks.css";

function TopPicsPage() {
  return (
    <>
      <section id="toppics" className="top-pics-page">
        <h1 className="top-title">Our Top Pics</h1>
        <p className="top-description">
          Not sure where to start? Jump into these trending lessons.
        </p>
        <div className="card-container">
          <div className="card">
            <div className="card-img-container">
              <img
                className="card-img"
                src="./src/assets/handcoding.svg"
                alt="Card 1"
              />
            </div>
            <h2 className="card-title">Code Basics</h2>
            <p className="card-description">
              Description: Learn the core of HTML, CSS, and JavaScript from
              scratch.
            </p>
          </div>
          <div className="card">
            <div className="card-img-container">
              <img
                className="card-img"
                src="./src/assets/yoga.svg"
                alt="Card 1"
              />
            </div>
            <h2 className="card-title">Yoga Flow</h2>
            <p className="card-description">
              Description: Build flexibility and calm with beginner-friendly
              yoga sessions
            </p>
          </div>
          <div className="card">
            <div className="card-img-container">
              <img
                className="card-img"
                src="./src/assets/brain.svg"
                alt="Card 1"
              />
            </div>
            <h2 className="card-title">Mind Power</h2>
            <p className="card-description">
              Description: Simple tips and habits to boost focus, mindset, and
              clarity.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default TopPicsPage;
