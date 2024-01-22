import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";
import { createMyProfile, getMyProfile } from "../../utilities/coins-service";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [profile, setProfile] = useState([]);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const createProfile = async () => {
    const authId = user.sub.substring(user.sub.indexOf("|") + 1);
    // console.log({authId});
    try {
      const create = await createMyProfile({
        googleId: authId,
        name: `${user.given_name} + ${user.family_name}`,
        email: user.email,
        portfolio: [],
      });
      //   console.log("USER NAME", create.name);
      const userProfile = await getMyProfile(authId);
      setProfile(userProfile);
      //   console.log("WORKING");
      //   console.log("working");
    } catch (err) {
      console.log(err.message);
    }
  };
  //   console.log({user})

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
  }, []);

  const handleChange = () => {
    setEditName(e.target.value);
    setEditEmail(e.target.value);
  };

  const editProfile = async () => {};

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated &&
    profile && (
      <div>
        <img src={user.picture} />
        <h2>{profile.name}</h2>
        <p>{profile.email}</p>
        <form onSubmit={editProfile}>
          <input
            value={editName}
            onChange={handleChange}
            placeholder="Edit Name"
          />
          <input
            value={editEmail}
            onChange={handleChange}
            placeholder="Edit Email"
          />
          <button type="submit">Edit</button>
        </form>
      </div>
    )
  );
};

export default Profile;
