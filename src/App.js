import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import './App.css';
import { AuthContext } from "./Authentication/Authentication";

const App = (props) => {
  const {isAuthenticated} = useContext(AuthContext)

  return (
    <div>
      <nav className="header">
      {isAuthenticated ?
      <header>

      <Link to="/landing">kattiwae.com</Link> |{" "}
      <Link to="/linking">Link services</Link> |{" "}
      <Link to="/privacy">Privacy</Link> |{" "}
      <Link to="/logout">Logout</Link> 
      </header> 
      :
      <header>
        <Link to="/">kattiwae.com</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/privacy">Privacy</Link> 
      </header>
      }
      </nav>
      <Outlet/>
    </div>
  );
}

export default App;
