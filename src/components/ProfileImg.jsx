import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebase";
import PropTypes from "prop-types";

const ProfileImg = ({ user }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="cursor-pointer" onMouseOut={() => setIsClicked(false)}>
      {isClicked ? (
        <div
          className="w-20 h-12 rounded-xl bg-blue-500 text-lg text-white flex justify-center items-center"
          onClick={() => signOut(auth)}
        >
          Sign Out
        </div>
      ) : (
        <img
          src={user.photoURL}
          alt="profile picture"
          className="rounded-full w-12 h-12"
          onClick={() => setIsClicked(true)}
        />
      )}
    </div>
  );
};

ProfileImg.propTypes = {
  user: PropTypes.shape({
    photoURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileImg;
