import React from 'react';

const Bookings = () => {
  return (
    <div className="container mt-5">
      <h2>My Bookings</h2>
      <p>Here you can view and manage your bookings.</p>
      <div className="alert alert-info">
        No bookings yet. Start by browsing properties!
      </div>
    </div>
  );
};

export default Bookings;