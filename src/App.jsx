import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Courses from "./pages/courses/Courses";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";
import AdminRoute from "./components/AdminRoute";
import LoginRoute from "./components/LoginRoute";
import TeacherRoute from "./components/TeacherRoute";
import MyCourses from "./pages/mycourses/MyCourses";
import axios from "axios";
import { useSelector } from "react-redux";
import Course from "./pages/course/Course";
import WaitingCourses from "./pages/waiting-courses/WaitingCourses";
import Category from "./pages/categories/Category";


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
        <Route path="/course/:id" element={
          <main className="flex">
            <Sidebar />
            <LoginRoute>
              <Course />
            </LoginRoute>
          </main>
        } />
        <Route path="/waiting-courses" element={
          <main className="flex">
            <Sidebar />
            <LoginRoute>
              <AdminRoute>
                <WaitingCourses />
              </AdminRoute>
            </LoginRoute>
          </main>
        } />
        <Route path="/category" element={
          <main className="flex">
            <Sidebar />
            <LoginRoute>
              <AdminRoute>
                <Category />
              </AdminRoute>
            </LoginRoute>
          </main>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;