import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard! Here you can manage your properties or view your bookings.</p>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">My Properties</h5>
              <p className="card-text">Manage your listed properties.</p>
              <a href="/properties" className="btn btn-primary">View Properties</a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">My Bookings</h5>
              <p className="card-text">View and manage your bookings.</p>
              <a href="/bookings" className="btn btn-primary">View Bookings</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;