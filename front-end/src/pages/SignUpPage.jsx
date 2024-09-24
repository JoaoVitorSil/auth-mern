import Input from "../components/Input";
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { Eye, EyeOff, Loader, Lock, Mail, User } from "lucide-react"
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";


const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const {signup, error, isLoading} = useAuthStore();

    const toggle = () => {
        setOpen(!open)
    }
    const handleSignUp = async(e) => {
        e.preventDefault();

        try {
            await signup(email, password, username);
            navigate('/verify-email');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-blur-xl
    rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r 
            from-cyan-400 to-blue-700 text-transparent bg-clip-text">
                    Create Account
                </h2>

                <form onSubmit={handleSignUp}>
                    <Input
                        icon={User}
                        id="hs-toggle-password"
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <Input
                        icon={Mail}
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="relative mb-6">
                        <Input
                            icon={Lock}
                            type={(open === false) ? 'password' : 'text'}
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center 
                        pr-3">
                            {(open === false) ? <Eye className="size-5 text-blue-500 cursor-pointer" onClick={toggle} /> :
                                <EyeOff className="size-5 cursor-pointer text-blue-500" onClick={toggle} />}
                        </div>
                    </div>
                    {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
                    <PasswordStrengthMeter password={password}/>
                    <button
                        className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-cyan-500
                            to-blue-600 text-white font-bold rounded-lg shadow-lg 
                            hover:from-cyan-600 hover:to-blue-700 focus:outline-none 
                            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
						    focus:ring-offset-gray-900 transition duration-200'
                        type="submit"
                        disabled={isLoading}
                        >
                            {isLoading ? <Loader className="animete-spin mx-auto" size={24}/> : "Sign Up"}
                    </button>
                </form>
            </div>
            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Already have an account?{" "}
					<Link to={"/login"} className='text-blue-400 hover:underline'>
						Login
					</Link>
				</p>
			</div>
        </div>
    )
}

export default SignUpPage