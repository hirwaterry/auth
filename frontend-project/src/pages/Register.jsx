import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Registration failed");
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="bg-green-300 min-h-screen flex justify-center items-center">
            <div>
                <h1 className="text-4xl font-bold text-white">Register</h1>
                <p className="text-gray-500">Fill your credentials to register</p>
                
                {error && (
                    <div className="mt-2 p-2 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-2 mt-5">
                    <input
                        className="p-4 block bg-green-100 rounded-2xl text-black w-60"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="p-4 block bg-green-100 rounded-2xl text-black w-60"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="p-4 block bg-green-100 rounded-2xl text-black w-60"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    
                    <button
                        className="text-white p-3 bg-green-400 rounded-2xl w-60 font-bold hover:bg-green-500 transition"
                        type="submit"
                    >
                        Register
                    </button>

                    <Link to="/login">
                        <p className="text-gray-500 mt-3">
                            Already have an account? <span className="text-black font-bold underline">Login</span>
                        </p>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Register;