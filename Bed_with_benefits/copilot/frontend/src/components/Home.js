import React from 'react';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="jumbotron bg-light p-5 rounded">
        <h1 className="display-4">Welcome to BedWithBenefits</h1>
        <p className="lead">Your home away from home. Find the perfect place to stay or rent out your property.</p>
        <hr className="my-4" />
        <p>Sign up today and start exploring!</p>
        <a className="btn btn-primary btn-lg" href="/register" role="button">Get Started</a>
      </div>
    </div>
  );
};

export default Home;