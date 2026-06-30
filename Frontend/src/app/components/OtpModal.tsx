import { useState } from 'react';
import axiosClient from '../../api/AxiousClient'; // Nhớ sửa lại đường dẫn nếu cần

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  msv: string; // Cần MSV để gửi kèm mã OTP xuống Backend
  onSuccess: () => void; // Hàm chạy khi xác thực thành công (để chuyển trang)
}

export default function OtpModal({ isOpen, onClose, msv, onSuccess }: OtpModalProps) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Backend của bạn dùng @RequestParam nên phải gửi qua params, body để null
      await axiosClient.post('/auth/verify', null, {
        params: {
          msv: msv,
          otpCode: otp
        }
      });

      alert("Xác thực email thành công! Bạn có thể đăng nhập ngay bây giờ.");
      onSuccess(); // Báo lên Component cha là đã xong để chuyển sang trang Login

    } catch (err: any) {
      // Bắt lỗi từ Backend trả về (VD: "Mã xác nhận không chính xác!")
      setError(err.response?.data || "Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#141b2b] p-8 rounded-2xl border border-[#1a2332] w-[400px] shadow-2xl text-center">
        <h2 className="text-2xl text-white font-bold mb-2">Xác thực Email</h2>
        <p className="text-gray-400 text-sm mb-6">
          Hệ thống đã gửi một mã gồm 6 chữ số đến email của bạn. Vui lòng kiểm tra và nhập vào bên dưới.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              required
              maxLength={6}
              type="text"
              className="w-full text-center text-2xl tracking-[1em] bg-[#0a0e1a] text-white border border-[#1a2332] rounded-lg p-3 focus:border-blue-500 outline-none transition-colors"
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/[^0-9]/g, ''))} // Chỉ cho phép nhập số
              placeholder="••••••"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="flex gap-3 justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition-colors font-medium"
            >
              {loading ? 'Đang kiểm tra...' : 'Xác nhận'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}