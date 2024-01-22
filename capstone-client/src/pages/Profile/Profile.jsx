import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";
import {
  createMyProfile,
  getMyProfile,
  editMyProfile,
} from "../../utilities/user-service";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [profile, setProfile] = useState([]);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const navigate = useNavigate();

  const createProfile = async () => {
    const authId = user.sub.substring(user.sub.indexOf("|") + 1);
    // console.log({authId});
    try {
      const create = await createMyProfile({
        googleId: authId,
        name: `${user.given_name} ${user.family_name}`,
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
  //   console.log({ profile });

  useEffect(() => {
    if (isAuthenticated && user) {
      createProfile();
      getProfile();
    }
  }, [isAuthenticated, user]);

  const handleName = (e) => {
    setEditName(e.target.value);
  };

  const handleEmail = (e) => {
    setEditEmail(e.target.value);
  };

  const editProfile = async () => {
    const authId = user.sub.substring(user.sub.indexOf("|") + 1);
    try {
      const edit = await editMyProfile({
        googleId: authId,
        name: editName,
        email: editEmail,
        portfolio: [],
      });
    } catch (err) {
      console.log(err.message);
    }
    navigate("/profile");
  };

  //   if (!isAuthenticated) {
  //     return <Navigate to="/profile" />;
  //   }

  if (!isAuthenticated || isLoading) {
    return <div>Loading ...</div>;
  }

  const renderLoading = () => (
    <section>
      <h2>Loading...</h2>
    </section>
  );

  const renderProfile = () =>
    isAuthenticated &&
    profile &&
    !isLoading && (
      <div>
        <img src={user.picture} />
        <h2>{profile.name}</h2>
        <p>{profile.email}</p>
        <form onSubmit={editProfile}>
          <input
          className='user-input'
            value={editName}
            onChange={handleName}
            placeholder="Edit Name"
          />
          <input
          className='user-input'
            value={editEmail}
            onChange={handleEmail}
            placeholder="Edit Email"
          />
          <button className='btn' type="submit">Edit</button>
        </form>
      </div>
    );

  return isLoading ? renderLoading() : renderProfile();
};

export default Profile;
