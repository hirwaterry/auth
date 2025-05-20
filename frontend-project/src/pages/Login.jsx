import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid username or password");
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
                <h1 className="text-4xl font-bold text-white">Login</h1>
                <p className="text-gray-500">Fill your credentials to continue</p>
                
                {/* {error && (
                    <div className="mt-2 p-2 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )} */}

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
                        Login
                    </button>

                    <Link to="/register">
                        <p className="text-gray-500 mt-2">
                            Don't have an account? <span className="text-black font-bold underline">Register</span>
                        </p>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;