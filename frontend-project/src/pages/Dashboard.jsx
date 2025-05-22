import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"

const Dashboard = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar />
                <div className="flex-1 bg-gradient-to-br from-yellow-50 to-white flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-slate-800 mb-6">Welcome to your Dashboard</h1>
                        <p className="text-xl text-slate-600">You're successfully authenticated!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;