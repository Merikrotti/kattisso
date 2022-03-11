import { Link, Outlet } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div>
      <nav className="header">
      <header>
      <Link to="/">kattiwae.com</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/register">Register</Link> |{" "}
      <Link to="/privacy">Privacy</Link> 
      </header>
      </nav>
      <Outlet/>
    </div>
  );
}

export default App;
