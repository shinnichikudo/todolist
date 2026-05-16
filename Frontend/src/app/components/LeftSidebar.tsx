import { Calendar, BookOpen, Plus } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  color: string;
}

interface LeftSidebarProps {
  subjects: Subject[];
  onAddSubject: () => void;
}

export default function LeftSidebar({ subjects, onAddSubject }: LeftSidebarProps) {
  return (
    <div className="w-64 bg-[#0a0e1a] border-r border-[#1a2332] h-full flex flex-col">
      {/* Logo and Title */}
      <div className="p-6 border-b border-[#1a2332]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white text-xl">TestTool</h1>
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

      {/* Subjects List */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-400 text-sm uppercase tracking-wider">Subjects</h3>
          <button
            onClick={onAddSubject}
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-[#1a2332] text-gray-400 hover:text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1a2332] cursor-pointer group transition-colors"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: subject.color }}
              />
              <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                {subject.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
