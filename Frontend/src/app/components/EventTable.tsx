import React from 'react';

// 1. Cập nhật đầy đủ các trường dựa trên dữ liệu bạn dùng ở bên dưới
interface CalendarEvent {
  id: string;
  title: string;
  subject: string;
  date: Date;
  time: string;
  location?: string;
  color: string;
}

interface EventTableProps {
  events: CalendarEvent[];
}

export default function EventTable({ events }: EventTableProps) {


  const formatDate = (date: Date) => {

    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "N/A";
    }
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };


  return (
    <div className="w-full p-6 text-slate-100 animate-fadeIn">
      {/* Thanh công cụ nhỏ phía trên bảng */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-slate-400">
          Tìm thấy <span className="text-blue-400 font-semibold">{events.length}</span> sự kiện
        </p>
      </div>

      {/* Container Bảng bọc ngoài để scroll ngang */}
      <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-[#141a2e]">
        <table className="w-full border-collapse text-left text-sm text-slate-300">
          {/* Tiêu đề các cột */}
          <thead className="bg-[#1e2538] text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
            <tr>
              <th scope="col" className="px-6 py-4">Tên Sự Kiện</th>
              <th scope="col" className="px-6 py-4">Môn Học</th>
              <th scope="col" className="px-6 py-4">Ngày Diễn Ra</th>
              <th scope="col" className="px-6 py-4">Thời Gian</th>
              <th scope="col" className="px-6 py-4">Địa Điểm / Ghi Chú</th>
            </tr>
          </thead>

          {/* Nội dung dữ liệu từ database */}
          <tbody className="divide-y divide-slate-800/60">
            {events.length > 0 ? (
              events.map((event) => (
                <tr
                  key={event.id}
                  className="hover:bg-slate-800/40 transition-colors duration-150"
                >
                  {/* Tên Sự Kiện kèm chấm màu tương ứng với bộ lọc */}
                  <td className="px-6 py-4 font-medium text-white max-w-xs truncate">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: event.color }}
                      />
                      <span title={event.title}>{event.title}</span>
                    </div>
                  </td>

                  {/* Tên môn học */}
                  <td className="px-6 py-4 text-slate-400">
                    <span className="rounded bg-slate-800 px-2 py-1 text-xs font-medium text-slate-300">
                      {event.subject}
                    </span>
                  </td>

                  {/* Ngày diễn ra */}
                  <td className="px-6 py-4 text-slate-300">
                    {formatDate(event.date)}
                  </td>

                  {/* Giờ giấc */}
                  <td className="px-6 py-4 text-blue-400 font-mono">
                    {event.time}
                  </td>

                  {/* Địa điểm */}
                  <td className="px-6 py-4 text-slate-400 italic">
                    {event.location || "Xem chi tiết"}
                  </td>
                </tr>
              ))
            ) : (
              /* Trường hợp không có dữ liệu sự kiện */
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-2xl">📭</span>
                    <span>Không có dữ liệu sự kiện nào được tìm thấy.</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}