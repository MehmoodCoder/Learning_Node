import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./components/Tasks";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <TaskList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
