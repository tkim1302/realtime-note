function SignInWithGoogle({ handleLogin }) {
    return (
        <div className="flex w-80 h-28 rounded-xl bg-white gap-5">
            <img src="src/images/Google_logo.webp" alt="google logo" className="mt-6 ml-6 w-16 h-16"/>
            <button className="text-black" onClick={handleLogin}>Sign In With Google</button>
        </div>
    )
}

export default SignInWithGoogle
