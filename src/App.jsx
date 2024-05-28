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
import Teachers from "./pages/teachers/Teachers";
import Users from "./pages/users/Users";
import Conferences from "./pages/conferences/Conferences";
import Gift from "./pages/gifts/Gift";
import GiftTypes from "./pages/gift-types/GiftTypes";
import Hotels from "./pages/hotels/Hotels";


function App() {

  const { currentUser } = useSelector(state => state.user)
  axios.defaults.headers.common['Authorization'] = `Bearer ${currentUser?.token}`
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
            <AdminRoute>
              <Courses />
            </AdminRoute>
          </main>
        } />
        <Route path="/my-courses" element={
          <main className="flex">
            <Sidebar />
            <TeacherRoute>
              <MyCourses />
            </TeacherRoute>
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
            <AdminRoute>
              <WaitingCourses />
            </AdminRoute>
          </main>
        } />
        <Route path="/category" element={
          <main className="flex">
            <Sidebar />
            <AdminRoute>
              <Category />
            </AdminRoute>
          </main>
        } />
        <Route path="/teachers" element={
          <main className="flex">
            <Sidebar />
            <AdminRoute>
              <Teachers />
            </AdminRoute>
          </main>
        } />
        <Route path="/users" element={
          <main className="flex">
            <Sidebar />
            <AdminRoute>
              <Users />
            </AdminRoute>
          </main>
        } />
        <Route path="/conferences" element={
          <main className="flex">
            <Sidebar />
            <AdminRoute> <Conferences /> </AdminRoute>
          </main>
        } />
        <Route path="/gifts" element={
          <main className="flex">
            <Sidebar />
            <AdminRoute> <Gift /> </AdminRoute>
          </main>
        } />
        <Route path="/gifts/types" element={
          <main className="flex">
            <Sidebar />
            <AdminRoute> <GiftTypes /> </AdminRoute>
          </main>
        } />
        <Route path="/hotels" element={
          <main className="flex">
            <Sidebar />
            <AdminRoute> <Hotels /> </AdminRoute>
          </main>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;