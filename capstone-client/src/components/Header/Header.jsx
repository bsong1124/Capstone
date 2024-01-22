import { Link } from "react-router-dom";
import LoginButton from "../Auth/LoginButton";
import LogoutButton from "../Auth/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import "./Header.css";

const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/coins">Search</Link>
      <Link to="/portfolio">Portfolio</Link>
      {/* <Link to="/profile">Profile</Link> */}
      <Link to="/about">About</Link>
      <div>
        {!isLoading ? (
          isAuthenticated ? (
            <span>
              <img className="user-img" src={user.picture} />
              <Link to="/profile">Profile</Link> || <LogoutButton />
            </span>
          ) : (
            <LoginButton />
          )
        ) : null}
      </div>
    </nav>
  );
};

export default Header;
