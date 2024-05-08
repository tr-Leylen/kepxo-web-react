import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";
import AdminRoute from "./components/AdminRoute";
import LoginRoute from "./components/LoginRoute";

function App() {

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <main className="flex">
            <Sidebar />
            <LoginRoute>
              <AdminRoute>
                <Home />
              </AdminRoute>
            </LoginRoute>
          </main>
        } />
        <Route path="/courses" element={
          <main className="flex">
            <Sidebar />
            <LoginRoute>
              <AdminRoute>
                <Courses />
              </AdminRoute>
            </LoginRoute>
          </main>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;