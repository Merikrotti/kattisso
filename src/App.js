import { Link, Outlet } from "react-router-dom";
import './App.css';
import Cookies from "universal-cookie";

const App = (props) => {
  const cookies = new Cookies();
  return (
    <div>
      <nav className="header">
      {props.isAuthenticated ?
      <header>

      <Link to="/landing">kattiwae.com</Link> |{" "}
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
