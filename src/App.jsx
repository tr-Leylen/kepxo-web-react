import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Courses from "./pages/Courses";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <main className="flex">
            <Sidebar />
            <Home />
          </main>
        } />
        <Route path="/courses" element={
          <main className="flex">
            <Sidebar />
            <Courses />
          </main>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;