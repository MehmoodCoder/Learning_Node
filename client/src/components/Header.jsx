import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: "1rem", background: "#eee" }}>
      <h2>GrowthLift App</h2>
      <nav>
        {user ? (
          <div>
            <span>Welcome, <strong>{user.name}</strong></span>
            <button onClick={logout} style={{ marginLeft: "10px" }}>Logout</button>
          </div>
        ) : (
          <div>
            <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;