import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

const TaskList = lazy(() => import("./components/Tasks"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ProtectedRoute = lazy(() => import("./pages/ProtectedRoute"));

export default function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
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
      </Suspense>
    </>
  );
}