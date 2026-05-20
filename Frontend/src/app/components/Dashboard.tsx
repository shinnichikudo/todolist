import { useState, useEffect } from 'react';
import LeftSidebar from './LeftSidebar';
import CalendarView from './CalendarView';
import RightSidebar from './RightSidebar';
import FloatingAddButton from './FloatingAddButton';
import AddSubjectModal from './AddSubjectModal';
import SubjectAPI from '../../api/SubjectAPI';

interface Subject {
  id: string;
  name: string;
  color: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  subject: string;
  subject_id?: string;
  date: Date;
  time: string;
  location?: string;
  color: string;
}

export default function Dashboard() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const subjectRes = await SubjectAPI.getSubjects();
        console.log("Dữ liệu thô từ Backend:", subjectRes);

        // 1. Map danh sách môn học
        const mappedSubjects = subjectRes.map((subject: any) => ({
          id: subject.id.toString(),
          name: subject.name,
          color: '#' + Math.floor(Math.random() * 16777215).toString(16)
        }));
        setSubjects(mappedSubjects);

        //  Gom tất cả các event từ các môn học lại
        const allEvents: CalendarEvent[] = [];
        subjectRes.forEach((subject: any) => {
          if (subject.events && Array.isArray(subject.events)) {
            subject.events.forEach((ev: any) => {

              const rawDate = ev.event_date ? new Date(ev.event_date) : new Date();

              allEvents.push({
                id: ev.id ? ev.id.toString() : Math.random().toString(),
                title: ev.title || "Không có tiêu đề",
                subject: ev.subject || subject.name,
                subject_id: subject.id.toString(), // 🟢 Lưu lại ID môn học cha để xử lý lọc

                date: rawDate,

                // Tách giờ từ chuỗi datetime-local tự động nếu không có cột time độc lập
                time: ev.event_date
                  ? new Date(ev.event_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                  : "00:00 AM",
                location: "Xem chi tiết",
                color: '#' + Math.floor(Math.random() * 16777215).toString(16)
              });
            });
          }
        });

        setEvents(allEvents);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu từ Database:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // loc event
  const filteredEvents = selectedSubjectId
    ? events.filter(event => event.subject_id === selectedSubjectId)
    : events;

  // Cập nhật lại upcomingEvents dựa trên danh sách đã lọc (hoặc giữ nguyên mảng gốc tuỳ bạn)
  const upcomingEvents = filteredEvents
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  const handleAddEvent = () => {
    console.log('Add new event clicked');
  };

  const handleAddSubjectClick = () => {
    setIsModalOpen(true);
  };

  const handleSubjectAdded = (newSubject: Subject) => {
    setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
  };

  const handleDateClick = (date: Date) => {
    console.log('Date clicked:', date);
  };

  return (
    <div className="size-full flex bg-[#0f1423] dark">
      {/* 🟢 TRUYỀN THÊM TRẠNG THÁI FILTER VÀO SIDEBAR TRÁI */}
      <LeftSidebar
        subjects={subjects}
        onAddSubject={handleAddSubjectClick}
        selectedSubjectId={selectedSubjectId}
        onSelectSubject={setSelectedSubjectId}
      />

      {/* Đưa mảng đã qua lọc (filteredEvents) vào bảng lịch vẽ */}
      <CalendarView events={filteredEvents} onDateClick={handleDateClick} />

      <RightSidebar
        upcomingEvents={upcomingEvents}
        user={{ name: 'Alex', msv: '20261...' }}
      />

      <FloatingAddButton onClick={handleAddEvent} />

      <AddSubjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubjectAdded={handleSubjectAdded}
      />
    </div>
  );
}