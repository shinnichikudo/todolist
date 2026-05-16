import { Calendar, Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authAPI from '../../api/authAPI';
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

       try {
           const respond =await authAPI.login({ username:email, password : password });

       localStorage.setItem('token', respond.token);
         navigate('/dashboard');
         } catch (error) {
              setErrorMsg('Invalid email or password');
         }

    }


  return (
    <div className="size-full flex items-center justify-center bg-[#0f1423] dark">
      <div className="w-full max-w-md p-8">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mb-4">
            <Calendar className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-white text-3xl mb-2">TestTool</h1>
          <p className="text-gray-400 text-sm">Academic Calendar Platform</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#0a0e1a] border border-[#1a2332] rounded-xl p-8">
          <h2 className="text-white text-xl mb-6">Sign in to your account</h2>

            {/* Hiển thị thông báo lỗi màu đỏ nếu errorMsg có chữ */}
                      {errorMsg && (
                        <div className="mb-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
                          {errorMsg}
                        </div>
                      )}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#141b2b] border border-[#1a2332] rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="alex@university.edu"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#141b2b] border border-[#1a2332] rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <a href="#" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg transition-all shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-900/40"
            >
              Sign in
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-400 hover:text-blue-300 transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-8">
          © 2026 TestTool. Academic Calendar Management System.
        </p>
      </div>
    </div>
  );
}
