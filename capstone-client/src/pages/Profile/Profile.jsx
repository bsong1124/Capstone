import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";
import { createMyProfile } from "../../utilities/coins-service";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  // console.log('EMAIL', user.email)
  const [profile, setProfile] = useState([]);

  const createProfile = async () => {
    const authId = user.sub.substring(user.sub.indexOf("|") + 1);
    // console.log({authId});
    try {
      const create = await createMyProfile({
        googleId: authId,
        email: user.email,
        portfolio: [],
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log({ user });

  useEffect(() => {
    createProfile();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={""} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;
