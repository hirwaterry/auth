import Navbar from "../components/Navbar"

const Dashboard = () => {
    return (
        <div>
            <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-6">Welcome to your Dashboard</h1>
          <p className="text-xl text-slate-600">You're successfully authenticated!</p>
        </div>
      </div>
        </div>
    );
  };
  
  export default Dashboard;