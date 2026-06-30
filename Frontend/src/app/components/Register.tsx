import { Calendar, Mail, Lock, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authAPI from '../../api/authApi';
import OtpModal from './OtpModal'; // QUAN TRỌNG: Import Modal vào đây

export default function Register() {
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const [msv, setMsv] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [registeredMsv, setRegisteredMsv] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // 1. Chặn reload trang phải đặt đầu tiên
    setErrorMsg('');

    // 2. Kiểm tra mật khẩu
    if (password !== confirmPassword) {
      setErrorMsg('Mật khẩu nhập lại không khớp!');
      return;
    }

    try {
        setIsLoading(true);
      // 3. Đóng gói dữ liệu
      const payload = {
        msv: msv,
        email: email,
        password: password,

      };

      // 4. Gọi API
      await authAPI.register(payload);

      // 5. NẾU THÀNH CÔNG: Lưu MSV và mở Popup OTP
      setRegisteredMsv(msv);
      setIsOtpModalOpen(true);

    } catch (error: any) {
      console.error('Registration error:', error);
      setErrorMsg('Đăng ký thất bại: ' + (error.response?.data || error.message));
    }
    finally {
        setIsLoading(false);}
  };

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

        {/* Register Form */}
        <div className="bg-[#0a0e1a] border border-[#1a2332] rounded-xl p-8">
          <h2 className="text-white text-xl mb-6">Create your account</h2>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            {/* MSV Field */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Student ID (MSV)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  value={msv}
                  onChange={(e) => setMsv(e.target.value)}
                  className="w-full bg-[#141b2b] border border-[#1a2332] rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="20261..."
                  required
                />
              </div>
            </div>

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
                  placeholder="Create a strong password"
                  required
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#141b2b] border border-[#1a2332] rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg transition-all shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-900/40"
                >{isLoading ? 'Đang gửi mã xác nhận...' : 'Create account'}

              Create account
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-8">
          © 2026 TestTool. Academic Calendar Management System.
        </p>

        {/* Gắn Popup OTP vào đây */}
        <OtpModal
          isOpen={isOtpModalOpen}
          onClose={() => setIsOtpModalOpen(false)}
          msv={registeredMsv}
          onSuccess={() => {
            setIsOtpModalOpen(false);
            navigate('/'); // Chuyển về trang đăng nhập
          }}
        />
      </div>
    </div>
  );
}