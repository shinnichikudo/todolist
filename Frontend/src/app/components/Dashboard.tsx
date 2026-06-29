import { useState, useEffect } from 'react';
import LeftSidebar from './LeftSidebar';
import CalendarView from './CalendarView';
import RightSidebar from './RightSidebar';
import FloatingAddButton from './FloatingAddButton';
import AddSubjectModal from './AddSubjectModal';
import SubjectAPI from '../../api/SubjectAPI';
import EvenTable from './EventTable';
import authApi from '../../api/authApi';
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
  const [activeTab, setActiveTab] = useState<'calendar' | 'events'>('calendar');
  const [user,setUser ] = useState<UserProfile>({
      email : " loading ",
      msv : " loading "
      })



  useEffect(() => {
      const fetchUserProfile = async () => {
            try {
              const token = localStorage.getItem('token');
              if (!token) return;

              const userRes = await authApi.getProfile();


              setUser({

                msv: userRes.msv.toString(),
                email: userRes.email
              });
            } catch (error) {
              console.error("Lỗi khi lấy profile:", error);
            }
          };
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
    fetchUserProfile();
    fetchDashboardData();
  }, []);

  // loc event
  const filteredEvents = selectedSubjectId
    ? events.filter(event => event.subject_id === selectedSubjectId)
    : events;

  // Cập nhật lại upcomingEvents dựa trên danh sách đã lọc
    const todaystart = new Date();
    todaystart.setHours(0, 0, 0, 0); // Đặt thời gian về đầu ngày
    const upcomingEvents = filteredEvents.filter(event =>
    {
        const eventday = new Date(event.date);
        eventday.setHours(0, 0, 0, 0);
        return eventday >= todaystart;``
        })
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5); // Lấy 5 sự kiện sắp tới nhất



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

      <LeftSidebar
        subjects={subjects}
        onAddSubject={handleAddSubjectClick}
        selectedSubjectId={selectedSubjectId}
        onSelectSubject={setSelectedSubjectId}
        activeTab={activeTab}
        onTabChange={setActiveTab}

      />
      <div className="flex-1 overflow-auto relative">
      {
          activeTab === 'calendar' ?(
          <CalendarView events={filteredEvents} onDateClick={handleDateClick} />
          ) :
      (
          <EvenTable events={filteredEvents} />)

          }
      </div>




      <RightSidebar
        upcomingEvents={upcomingEvents}
        user={user }
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