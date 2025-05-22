import Navbar from "../components/Navbar"
import { Navigate, useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    
    const handleGetStarted = () => {
        navigate('/login');
    };
    
    return (
        <>
        <Navbar />
        <div className="min-h-screen bg-columbia-blue">
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-bold text-indigo-dye mb-6">
                    Welcome to Car Wash sales Management System
                </h1>
                <p className="text-xl text-moonstone max-w-2xl mx-auto">
                    A secure CWSMS system for managing car wash sales.
                </p>

                <div className="mt-20">
                    <button 
                        onClick={handleGetStarted}
                        className="text-2xl bg-green-200 p-4 rounded-xl hover:bg-green-300"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}