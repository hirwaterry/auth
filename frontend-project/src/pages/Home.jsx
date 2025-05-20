import Navbar from "../components/Navbar"
export default function Home() {
    return (

        <>
        <Navbar />
      <div className="min-h-screen bg-columbia-blue">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-indigo-dye mb-6">
            Welcome to AuthApp
          </h1>
          <p className="text-xl text-moonstone max-w-2xl mx-auto">
            A secure authentication system built with MERN stack and session-based authentication.
          </p>
        </div>
      </div>
        </>
    );
  }