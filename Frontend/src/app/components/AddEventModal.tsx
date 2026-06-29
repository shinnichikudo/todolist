import { useState } from 'react';
import axiosClient from '../../api/AxiousClient';

interface Subject {
  id: string;
  name: string;
}

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventAdded: (newEvent: any) => void;
  subjects: Subject[];
  userMsv?: string;
}

export default function AddEventModal({ isOpen, onClose, onEventAdded, subjects, userMsv }: AddEventModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    subject_id: '',
    date: '',
    time: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!userMsv || userMsv === " loading ") {
        alert("Chưa load xong thông tin user, vui lòng thử lại sau!");
        return;
    }

    try {

      const payload = {
        title: formData.title,
        event_date: `${formData.date}T${formData.time}:00`,
        subject_id: Number(formData.subject_id),
        user_msv: userMsv
      };


      const response = await axiosClient.post('/events', payload);


      const savedEvent = response as any;


      onEventAdded({
        id: savedEvent.id.toString(),
        title: savedEvent.title,
        subject: savedEvent.subject_name,
        subject_id: savedEvent.subject_id.toString(),
        date: new Date(savedEvent.event_date),
        time: formData.time,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
      });


      onClose();
      setFormData({ title: '', subject_id: '', date: '', time: '' });

    } catch (error) {
      console.error("Lỗi khi thêm sự kiện:", error);
      alert("Lưu thất bại! Hãy bật F12 tab Network để xem chi tiết lỗi.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#141b2b] p-6 rounded-xl border border-[#1a2332] w-[400px]">
        <h2 className="text-xl text-white font-bold mb-4">Thêm sự kiện mới</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tên sự kiện</label>
            <input
              required
              type="text"
              className="w-full bg-[#0a0e1a] text-white border border-[#1a2332] rounded-lg p-2 focus:border-blue-500 outline-none"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              placeholder="VD: Thi giữa kỳ, Nộp bài..."
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Môn học</label>
            <select
              required
              className="w-full bg-[#0a0e1a] text-white border border-[#1a2332] rounded-lg p-2 focus:border-blue-500 outline-none"
              value={formData.subject_id}
              onChange={e => setFormData({...formData, subject_id: e.target.value})}
            >
              <option value="" disabled>-- Chọn môn học --</option>
              {subjects.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1">Ngày</label>
              <input
                required
                type="date"
                className="w-full bg-[#0a0e1a] text-white border border-[#1a2332] rounded-lg p-2 focus:border-blue-500 outline-none"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1">Giờ</label>
              <input
                required
                type="time"
                className="w-full bg-[#0a0e1a] text-white border border-[#1a2332] rounded-lg p-2 focus:border-blue-500 outline-none"
                value={formData.time}
                onChange={e => setFormData({...formData, time: e.target.value})}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Lưu sự kiện
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}