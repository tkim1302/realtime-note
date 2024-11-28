import PropTypes from "prop-types";

const SignInWithGoogle = ({ handleLogin }) => {
  return (
    <button
      className="flex w-80 h-28 items-center rounded-xl bg-white gap-5"
      onClick={handleLogin}
    >
      <img
        src="/images/Google_logo.webp"
        alt="google logo"
        className="ml-6 w-16 h-16"
      />
      <div className=" text-black">Sign In With Google</div>
    </button>
  );
};

SignInWithGoogle.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default SignInWithGoogle;
