import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const App = () => {

    
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const { registerUser, loginUser, loading, error } = useAuthContext(); // Use AuthContext

    const toggleForm = () => {
        setIsRegister(!isRegister);
        setEmail('');
        setPassword('');
        setUsername('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isRegister) {
            await registerUser({ email, password, username });
        } else {
            await loginUser({ username, password });
            navigate('/')
        }

        setEmail('');
        setPassword('');
        setUsername('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full sm:w-96">
                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    {isRegister ? 'Register' : 'Login'}
                </h2>

                <form className="space-y-6" onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-2 w-full text-gray-900 bg-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#047CA4]"
                            required
                        />
                    </div>

                    {isRegister && (
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-2 w-full text-gray-900 bg-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#047CA4]"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 w-full text-gray-900 bg-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#047CA4]"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-[#047CA4] text-white py-2 rounded-md transition duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : isRegister ? 'Register' : 'Login'}
                    </button>
                </form>

                <p className="text-center text-gray-300 mt-4 flex flex-col">
                    {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                        type="button"
                        onClick={toggleForm}
                        className="text-[#047CA4] focus:outline-none mt-2"
                    >
                        {isRegister ? 'Login here' : 'Register here'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default App;
