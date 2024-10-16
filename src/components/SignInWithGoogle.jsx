function SignInWithGoogle({ handleLogin }) {
    return (
        <div>
            <button className="w-72 h-28 rounded-xl bg-white text-black" onClick={handleLogin}>Sign In With Google</button>
        </div>
    )
}

export default SignInWithGoogle
