import { Link } from "react-router-dom";

const Header = () => {
  return (
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/coins'>Coins</Link>
        <Link to='/portfolio'>Portfolio</Link>
        <Link to='/profile'>Profile</Link>
      </nav>
  );
};

export default Header;
