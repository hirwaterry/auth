import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Service from "./pages/Service";
import Cars from "./pages/Cars";
import Packages from "./pages/Packages";
import Reports from "./pages/Reports";
import ServicePackages from "./pages/ServicePackages";
import Adduser from "./pages/Adduser";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/service"
            element={
              <ProtectedRoute>
                <Packages />
              </ProtectedRoute>
            }
          />
          <Route path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />

<Route path="/adduser"
            element={
              <ProtectedRoute>
                <Adduser />
              </ProtectedRoute>
            }
          />

<Route path="/payment"
            element={
              <ProtectedRoute>
                <ServicePackages />
              </ProtectedRoute>
            }
          />

<Route path="/cars"
            element={
              <ProtectedRoute>
                <Cars />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
