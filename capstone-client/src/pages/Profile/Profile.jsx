import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";
import { createMyProfile, getMyProfile } from "../../utilities/coins-service";

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
      //   console.log("WORKING");
      //   console.log("working");
    } catch (err) {
      console.log(err.message);
    }
  };

  const getProfile = async () => {
    const authId = user.sub.substring(user.sub.indexOf("|") + 1);
    try {
      const userProfile = await getMyProfile(authId);
      setProfile(userProfile);
    } catch (err) {
      console.log(err.message);
    }
  };
  console.log({ profile });

  useEffect(() => {
    createProfile();
    getProfile();
  }, [isAuthenticated, user, setProfile]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated &&
    profile &&
      <div>
        <img src={user.picture} />
        <h2>{user.name}</h2>
        <p>{profile.email}</p>
      </div>
  );
};

export default Profile;
