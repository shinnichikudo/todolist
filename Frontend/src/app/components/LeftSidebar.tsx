import { Calendar, BookOpen, Plus } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  color: string;
}


interface LeftSidebarProps {
  subjects: Subject[];
  onAddSubject: () => void;
  selectedSubjectId: string | null;
  onSelectSubject: (id: string | null) => void;
}

export default function LeftSidebar({
  subjects,
  onAddSubject,
  selectedSubjectId,
  onSelectSubject
}: LeftSidebarProps) {

  return (
    <div className="w-64 bg-[#0a0e1a] border-r border-[#1a2332] h-full flex flex-col">
      {/* Logo and Title */}
      <div className="p-6 border-b border-[#1a2332]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white text-xl font-semibold">TestTool</h1>
            <p className="text-gray-500 text-xs">Academic Calendar</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 border-b border-[#1a2332]">
        <nav className="space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 transition-colors">
            <Calendar className="w-5 h-5" />
            <span>Calendar</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-[#1a2332] transition-colors">
            <BookOpen className="w-5 h-5" />
            <span>All Events</span>
          </button>
        </nav>
      </div>

      {/* Subjects List & Filter */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-400 text-sm uppercase tracking-wider">Subjects</h3>
          <button
            onClick={onAddSubject} // Sử dụng hàm mở modal truyền từ cha xuống
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-[#1a2332] text-gray-400 hover:text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1">
          {/* 🟢Nút TẤT CẢ LỊCH TRÌNH (Được đưa vào đúng cấu trúc giao diện) */}
          <div
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
              selectedSubjectId === null
                ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20'
                : 'text-gray-400 hover:bg-[#1a2332] hover:text-white'
            }`}
            onClick={() => onSelectSubject(null)}
          >
            <span>🌟 All Schedules</span>
          </div>

          <hr className="border-[#1a2332] my-2" />

          {/*  Danh sách môn học động được truyền từ Database */}
          <div className="space-y-1 max-h-[350px] overflow-y-auto pr-1">
            {subjects?.map((subject) => (
              <div
                key={subject.id}
                // Nếu môn học này được click chọn thì sẽ đổi style làm nổi bật lên
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer group transition-all ${
                  selectedSubjectId === subject.id
                    ? 'bg-slate-800 text-white font-semibold border-l-4 border-blue-500 pl-2'
                    : 'text-gray-400 hover:bg-[#1a2332] hover:text-white'
                }`}
                onClick={() => onSelectSubject(subject.id)}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform group-hover:scale-125"
                  style={{ backgroundColor: subject.color }}
                />
                <span className="text-sm truncate">
                  {subject.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}