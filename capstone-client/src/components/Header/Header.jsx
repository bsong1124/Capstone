import { Link } from "react-router-dom";
import LoginButton from "../Auth/LoginButton";
import LogoutButton from "../Auth/LogoutButton";

const Header = () => {
  // const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/coins">Coins</Link>
      <Link to="/portfolio">Portfolio</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/about">About</Link>
      <div>
        <LoginButton/>
      </div>
    </nav>
  );
};

export default Header;
