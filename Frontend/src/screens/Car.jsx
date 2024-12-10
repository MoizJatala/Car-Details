import React, { useState, useRef, useEffect } from 'react';
import { useCarContext } from '../context/CarContext';
import { useNavigate } from 'react-router-dom';

const Car = () => {
    const navigate = useNavigate();
    const { cars, loading, error, fetchCars, addCar } = useCarContext();

    const [image, setImage] = useState(null);
    console.log("image", image);
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    // Create a ref for the file input to reset it
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchCars(); // Fetch cars on component mount
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); // Store the File object, not the Blob URL
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        if (image) {
            formData.append('photo', image); // Ensure 'photo' matches the backend field name
        }
    
        console.log('FormData contents:');
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }
    
        await addCar(formData);
    
        // Reset form
        setName('');
        setPrice('');
        setImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    

    // Check if token exists in localStorage
    const token = localStorage.getItem('token');

    if (!token) {
        return (
            <div className="min-h-screen p-8 flex flex-col items-center justify-center">
                <p className="text-xl font-semibold text-black mb-6">Please register to submit data.</p>
                <button
                    onClick={() => navigate('/login')}
                    className="bg-[#047CA4] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Go to Register
                </button>

                {/* Display cars, but do not allow adding new cars */}
                <div className="w-full flex justify-center flex-wrap gap-6 py-8">

                    {cars.map((car, index) => {
                        console.log("carsss", car?.photo); // Place the log inside the function body

                        return (
                            <div key={index} className="bg-gray-800 p-4 rounded-2xl text-white shadow-lg hover:shadow-2xl transition duration-300 w-full sm:w-96 md:w-80">
                                <div className="flex justify-center mb-4">
                                    <img
                                        src={car?.photo}
                                        alt="Car"
                                        className="object-cover rounded-xl w-40 h-40"
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <h3 className="text-lg font-semibold text-gray-300">Name: {car.name}</h3>
                                    <p className="text-gray-400">Price: {car.price}</p>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 flex flex-col items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-lg shadow-xl w-full sm:w-96 mb-8"
            >
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-2xl font-bold text-white text-center">Submit Detail</h2>

                    {/* <button
                        onClick={() => navigate('/login')}
                        className="bg-[#047CA4] text-white py-2 rounded-md transition duration-300"
                    >
                        Register
                    </button> */}
                </div>

                <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Car Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2 block w-full text-gray-900 bg-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-300">Pick Image</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-2 block w-full text-gray-900 bg-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        ref={fileInputRef}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-300">Price</label>
                    <input
                        id="price"
                        placeholder="Enter your price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-2 block w-full text-gray-900 bg-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#047CA4] text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Submit
                </button>
            </form>

            <div className="w-full flex justify-center flex-wrap gap-6 py-8">
                {cars.map((car, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-2xl text-white shadow-lg hover:shadow-2xl transition duration-300 w-full sm:w-96 md:w-80">
                        <div className="flex justify-center mb-4">
                            <img
                                src={car.photo}
                                alt="Car"
                                className="object-cover rounded-xl"
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <h3 className="text-lg font-semibold text-gray-300">Name: {car.name}</h3>
                            <p className="text-gray-400">Price: {car.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Car;
