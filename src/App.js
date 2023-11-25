import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  function PrivateRoute({ children }) {
    let token = JSON.parse(localStorage.getItem("token"));
    return token ? (
      <>
        <Navbar />
        {children}
      </>
    ) : (
      <Navigate to="/login" />
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
