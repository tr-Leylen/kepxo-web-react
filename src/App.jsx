import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";
import AdminRoute from "./components/AdminRoute";
import LoginRoute from "./components/LoginRoute";
import TeacherRoute from "./components/TeacherRoute";
import MyCourses from "./pages/MyCourses";
import axios from "axios";
import { useSelector } from "react-redux";


function App() {

  const { currentUser } = useSelector(state => state.user)
  axios.defaults.headers.common['Authorization'] = `Bearer ${currentUser.token}`
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <main className="flex">
            <Sidebar />
            <LoginRoute>
              <Home />
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
        <Route path="/my-courses" element={
          <main className="flex">
            <Sidebar />
            <LoginRoute>
              <TeacherRoute>
                <MyCourses />
              </TeacherRoute>
            </LoginRoute>
          </main>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;