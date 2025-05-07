import React from "react";
import "./ScrollSection.css";

function ScrollSection({
  image,
  altText,
  title,
  description,
  imagePosition = "left",
  backgroundColor = "new",
}) {
  return (
    <>
      <section
        id="about"
        className={`section-container ${
          imagePosition === "right" ? "reverse" : " "
        } ${backgroundColor === "new" ? "new-background" : " "}`}
      >
        <img className="section-svg" src={image} alt={altText}></img>
        <div className="section-content">
          <h1 className="section-title">{title}</h1>
          <p className="section-description">{description}</p>
        </div>
      </section>
    </>
  );
}

export default ScrollSection;
