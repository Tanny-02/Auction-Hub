import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About AuctionHub</h1>
      <div className="prose lg:prose-xl">
        <p className="mb-4">
          AuctionHub is your premier destination for online auctions, connecting buyers 
          and sellers in a secure and transparent marketplace.
        </p>
        <p className="mb-4">
          Founded in 2024, we've been committed to providing a seamless auction 
          experience for our users, with a focus on security, transparency, and 
          user satisfaction.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Our Mission</h3>
            <p>To create a trusted marketplace for unique items and collectibles.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Our Vision</h3>
            <p>To become the world's most trusted auction platform.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Our Values</h3>
            <p>Trust, transparency, and exceptional user experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;