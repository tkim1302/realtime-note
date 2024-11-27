import { useNavigate } from "react-router-dom";
import useStore from "../utils/store";
import ProfileImg from "./ProfileImg";

const Header = () => {
  const { user } = useStore();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between mt-8">
      <h1
        className="text-white text-4xl ml-14 font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        RealtimeNote
      </h1>
      {user && (
        <div className="mr-14">
          <div className="flex gap-5">
            <ProfileImg user={user} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
