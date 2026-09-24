import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./components/Tasks";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import Header from "./components/Header";
import Register from "./pages/Register";

export default function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <TaskList />
            </ProtectedRoute>
          }
        />
      </Routes>
      </>
  );
}
