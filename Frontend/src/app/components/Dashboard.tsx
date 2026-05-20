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
  date: Date;
  time: string;
  location?: string;
  color: string;
}

export default function Dashboard() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


 useEffect(() => {
   const fetchDashboardData = async () => {
     try {

       const subjectRes = await SubjectAPI.getSubjects();
       console.log("Dữ liệu thô từ Backend:", subjectRes);


       setSubjects(subjectRes.map((subject: any) => ({
         id: subject.id.toString(),
         name: subject.name,
         color: '#' + Math.floor(Math.random() * 16777215).toString(16)
       })));


       const allEvents: CalendarEvent[] = [];

       subjectRes.forEach((subject: any) => {

         if (subject.events && Array.isArray(subject.events)) {
           subject.events.forEach((ev: any) => {
             allEvents.push({
               id: ev.id ? ev.id.toString() : Math.random().toString(),
               title: ev.title || "",
               subject: subject.name, //


               date: ev.date ? new Date(ev.date) : new Date(2026, 4, 15),

               time: ev.time || "",
               location: ev.location || "",
               color: ev.color || '#' + Math.floor(Math.random() * 16777215).toString(16)
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

  const upcomingEvents = events
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
      {/* Truyền hàm mở modal vào thanh Sidebar bên trái */}
      <LeftSidebar subjects={subjects} onAddSubject={handleAddSubjectClick} />

      <CalendarView events={events} onDateClick={handleDateClick} />

      <RightSidebar
        upcomingEvents={upcomingEvents}
        user={{ name: 'Alex', msv: '20261...' }}
      />

      <FloatingAddButton onClick={handleAddEvent} />

      {/* 🟢 Tích hợp Modal bật tắt để thực thi lưu DB */}
      <AddSubjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubjectAdded={handleSubjectAdded}
      />
    </div>
  );
}