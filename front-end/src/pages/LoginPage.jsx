/* eslint-disable react/no-unescaped-entities */
import { useState } from "react"
import Input from "../components/Input";
import { Mail, Lock, Loader} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
	const {login, isLoading, error} = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();
		await login(email, password);
	};
    return (     
        <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-blur-xl
             rounded-2xl shadow-xl overflow-hidden">
                <div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r
                     from-cyan-400 to-blue-500 text-transparent bg-clip-text'>
					Welcome Back
				</h2>

				<form onSubmit={handleLogin}>
					<Input
						icon={Mail}
						type='email'
						placeholder='Email Address'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<Input
						icon={Lock}
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<div className='flex items-center mb-6'>
						<Link to='/forgot-password' className='text-sm text-blue-400 hover:underline'>
							Forgot password?
						</Link>
					</div>
					{error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}
					<button
	
						className='w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600
                           text-white font-bold rounded-lg shadow-lg
                           hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2
                           focus:ring-blue-500 focus:ring-offset-2 
                           focus:ring-offset-gray-900 transition duration-200'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? <Loader className="size-6 animate-spin text-center mx-auto"/> : "Login"}
					</button>
				</form>
			</div>
			<div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Don't have an account?{" "}
					<Link to='/signup' className='text-blue-400 hover:underline'>
						Sign up
					</Link>
				</p>
			</div>
        </div>
    )
}

export default LoginPage