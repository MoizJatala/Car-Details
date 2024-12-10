import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const CarContext = createContext();

export const CarProvider = ({ children }) => {
  
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCars = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://192.168.1.68:8000/info/`);
      setCars(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch cars');
    } finally {
      setLoading(false);
    }
  };

  const addCar = async (car) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('access');
  
    if (!token) {
      setError('No authentication token found');
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post(`http://192.168.1.68:8000/info/`, car, {
        headers: {
          'Authorization': `Bearer ${token}`, // Corrected "Bearer"
        },
      });
      setCars((prevCars) => [...prevCars, response.data]);
    } catch (err) {
      setError(err.message || 'Failed to add car');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <CarContext.Provider value={{ cars, loading, error, fetchCars, addCar }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCarContext = () => useContext(CarContext);
