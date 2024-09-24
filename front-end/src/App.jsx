/* eslint-disable react-hooks/exhaustive-deps */
import { Toaster } from "react-hot-toast"
import { Navigate, Route, Routes } from "react-router-dom"
import EmailVerificationPage from "./pages/EmailVerificationPage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import { useAuthStore } from "./store/authStore"
import { useEffect } from "react"
import DashboardPage from "./pages/DashboardPage"
import LoadingSpinner from "./components/LoadingSpinner"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};
ProtectedRoute.propTypes = {
    children: PropTypes.element,
};
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};
RedirectAuthenticatedUser.propTypes = {
    children: PropTypes.element,
};
function App() {
  const {checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(() => {
    if (!isCheckingAuth) {
      checkAuth();
    }
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 
    via-cyan-900 to-blue-900 flex items-center justify-center 
    relative overflow-hidden">
      		<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<DashboardPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/signup'
					element={
						<RedirectAuthenticatedUser>
							<SignUpPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/login'
					element={
						<RedirectAuthenticatedUser>
							<LoginPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route path='/verify-email' element={<EmailVerificationPage />} />
				<Route
					path='/forgot-password'
					element={
						<RedirectAuthenticatedUser>
							<ForgotPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>

				<Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>
				
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
      	<Toaster/>
    </div>
  )
}

export default App
