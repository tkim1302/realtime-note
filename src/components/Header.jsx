import useStore from "../utils/store";

const Header = ({ title }) => {
  const { user } = useStore();
  return (
    <div className="flex justify-between mt-8">
      <h1 className="text-white text-4xl ml-14 font-bold">{title}</h1>
      {user && (
        <div className="mr-14">
          <div className="flex gap-5">
            <img
              src={user.photoURL}
              alt="profile picture"
              className="rounded-full w-12 h-12"
            />
            <p className="mt-4">{user.displayName}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
