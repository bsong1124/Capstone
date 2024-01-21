import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useNavigate, Link } from "react-router-dom";

const authId = user.sub.substring(user.sub.indexOf("|") + 1);
const Portfolio = () => {
  const { user, isAuthenticated } = useAuth0();
  const [portfolio, setPortfolio] = useState([])

  const getPortfolio = async () => {
    try {
      const authId = user.sub.substring(user.sub.indexOf("|") + 1);
      const portfolioResponse = await getMyPortfolio()
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {});

  return (
    <div>
      <h1>Portfolio Page</h1>
    </div>
  );
};

export default Portfolio;
