import { useState, useEffect } from 'react';
import LeftSidebar from './LeftSidebar';
import CalendarView from './CalendarView';
import RightSidebar from './RightSidebar';
import FloatingAddButton from './FloatingAddButton';
import AddSubjectModal from './AddSubjectModal';
import AddEventModal from './AddEventModal';
import EventTable from './EventTable';

import SubjectAPI from '../../api/SubjectAPI';
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

interface UserProfile {
  email: string;
  msv: string;
}

export default function Dashboard() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  const [activeTab, setActiveTab] =
    useState<'calendar' | 'events'>('calendar');

  const [user, setUser] = useState<UserProfile>({
    email: 'loading...',
    msv: 'loading...',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userRes = await authApi.getProfile();

        setUser({
          msv: userRes.msv.toString(),
          email: userRes.email,
        });
      } catch (error) {
        console.error('Lỗi lấy profile:', error);
      }
    };

    const fetchDashboardData = async () => {
      try {
        const subjectRes = await SubjectAPI.getSubjects();

        console.log('Subject từ backend:', subjectRes);

        // Map Subject
        const mappedSubjects: Subject[] = subjectRes.map((subject: any) => ({
          id: subject.id.toString(),
          name: subject.name,
          color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        }));

        setSubjects(mappedSubjects);

        // Map Event
        const allEvents: CalendarEvent[] = [];

        subjectRes.forEach((subject: any) => {
          const subjectColor =
            mappedSubjects.find(
              (s) => s.id === subject.id.toString()
            )?.color || '#3b82f6';

          if (subject.events) {
            subject.events.forEach((ev: any) => {
              const eventDate = new Date(ev.eventDate);

              allEvents.push({
                id: ev.id.toString(),
                title: ev.title,
                subject: subject.name,
                subject_id: subject.id.toString(),
                date: eventDate,
                time: eventDate.toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
                location: ev.location,
                color: subjectColor,
              });
            });
          }
        });

        console.log('Events:', allEvents);

        setEvents(allEvents);
      } catch (error) {
        console.error('Lỗi tải Dashboard:', error);
      }
    };

    fetchUserProfile();
    fetchDashboardData();
  }, []);

  // Lọc theo môn học
  const filteredEvents = selectedSubjectId
    ? events.filter((event) => event.subject_id === selectedSubjectId)
    : events;

  // Upcoming Events
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const upcomingEvents = filteredEvents
    .filter((event) => {
      const eventDay = new Date(event.date);
      eventDay.setHours(0, 0, 0, 0);
      return eventDay >= todayStart;
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  const handleAddSubjectClick = () => {
    setIsModalOpen(true);
  };

  const handleSubjectAdded = (newSubject: Subject) => {
    setSubjects((prev) => [...prev, newSubject]);
  };

  const handleAddEvent = () => {
    setIsEventModalOpen(true);
  };

  const handleEventAdded = (newEvent: CalendarEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  const handleDateClick = (date: Date) => {
    console.log(date);
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
        {activeTab === 'calendar' ? (
          <CalendarView
            events={filteredEvents}
            onDateClick={handleDateClick}
          />
        ) : (
          <EventTable events={filteredEvents} />
        )}
      </div>

      <RightSidebar
        upcomingEvents={upcomingEvents}
        user={user}
      />

      <FloatingAddButton onClick={handleAddEvent} />

      <AddSubjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubjectAdded={handleSubjectAdded}
      />

      <AddEventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onEventAdded={handleEventAdded}
        subjects={subjects}
        userMsv={user.msv}
      />
    </div>
  );
}