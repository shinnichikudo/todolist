import { useState } from 'react';
import { X } from 'lucide-react';
import subjectAPI from '../../api/subjectApi';
import { jwtDecode } from 'jwt-decode';
interface MyJwtPayload {
  sub?: string;
  email?: string;
}

interface AddSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubjectAdded: (newSubject: any) => void;
}

export default function AddSubjectModal({ isOpen, onClose, onSubjectAdded }: AddSubjectModalProps) {
  const [subjectName, setSubjectName] = useState('');
  const [loading, setLoading] = useState(false);


  if (!isOpen) return null;

 const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!subjectName.trim()) return;

     setLoading(true);


     const token = localStorage.getItem('token') ||
                   localStorage.getItem('accessToken') ||
                   localStorage.getItem('jwt') || '';

     let currentUserEmail = '';

     try {
       if (token) {

         const decoded = jwtDecode<MyJwtPayload>(token);
         currentUserEmail = decoded.sub || decoded.email || '';
         console.log("Email giải mã thành công:", currentUserEmail);
       } else {

         alert("LỖI: Không tìm thấy Token trong localStorage! Bạn hãy kiểm tra lại xem lúc Login lưu tên Key là gì nhé.");
         setLoading(false);
         return;
       }

       if (!currentUserEmail) {
         alert("LỖI: Giải mã Token thành công nhưng không tìm thấy trường 'sub' hoặc 'email' bên trong.");
         setLoading(false);
         return;
       }


       const response = await subjectAPI.addSubject({
         name: subjectName.trim(),
         email: currentUserEmail,
       });

       onSubjectAdded({
           id: response.id,
                   name: response.name,
                   color: '#' + Math.floor(Math.random()*16777215).toString(16)
                 });
       setSubjectName('');
       onClose();
     } catch (error) {
       console.error('Lỗi chi tiết khi gọi API:', error);
       alert('Không thể thêm môn học mới. Vui lòng kiểm tra lại!');
     } finally {
       setLoading(false);
     }
   };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-[#0a0e1a] border border-[#1a2332] rounded-xl p-6 w-full max-w-sm relative shadow-2xl">

        {/* Nút X đóng modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-white font-semibold text-lg mb-4">Thêm môn học mới</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
              Tên môn học
            </label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="Ví dụ: Software Testing, Java Spring Boot..."
              className="w-full bg-[#141b2b] border border-[#1a2332] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              autoFocus
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 rounded-lg text-sm transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50"
          >
            {loading ? 'Đang lưu...' : 'Lưu môn học'}
          </button>
        </form>
      </div>
    </div>
  );
}