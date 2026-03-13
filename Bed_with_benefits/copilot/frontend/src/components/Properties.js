import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Properties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get('/api/properties');
        setProperties(res.data);
      } catch (err) {
        console.error('Failed to fetch properties', err);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Available Properties</h2>
      <div className="row">
        {properties.map(p => (
          <div key={p._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text">{p.description}</p>
                <p className="card-text"><strong>Location:</strong> {p.location}</p>
                <p className="card-text"><strong>Price:</strong> ${p.price}/night</p>
                <button className="btn btn-primary">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;