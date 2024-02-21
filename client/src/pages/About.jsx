// About.js

import React from 'react';

const About = () => {
  return (
    <section className="about-section">
      <img className="w-100" src="Cat0.jpg" alt="About Us" />
      <div className="h-100 text-center  fw-bold fs-2" style={{}}>
        <p>
          Our website specializes in animal products, offering a wide range of items for pet owners, animal enthusiasts, and professionals. With a focus on quality and animal welfare, the platform provides:
        </p>
        <ul>
          <p>Nutritious pet food and accessories</p>
          <p>Essential healthcare products</p>
          <p>Comfortable bedding and specialized grooming tools</p>
        </ul>
        <p>
          By catering to the diverse needs of different animal species and their owners, the website aims to be a go-to destination for top-notch animal supplies.
        </p>
      </div>
    </section>
  );
};

export default About;
