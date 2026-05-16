import { useState } from 'react';
import LeftSidebar from './LeftSidebar';
import CalendarView from './CalendarView';
import RightSidebar from './RightSidebar';
import FloatingAddButton from './FloatingAddButton';

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
  const [subjects] = useState<Subject[]>([
    { id: '1', name: 'Software Testing', color: '#3b82f6' },
    { id: '2', name: 'Java Spring Boot', color: '#10b981' },
    { id: '3', name: 'Database Systems', color: '#f59e0b' },
    { id: '4', name: 'Web Development', color: '#8b5cf6' },
    { id: '5', name: 'Computer Networks', color: '#ec4899' },
  ]);

  const [events] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Unit Testing Lab',
      subject: 'Software Testing',
      date: new Date(2026, 4, 5),
      time: '10:00 AM',
      location: 'Lab 301',
      color: '#3b82f6',
    },
    {
      id: '2',
      title: 'Spring Boot Midterm',
      subject: 'Java Spring Boot',
      date: new Date(2026, 4, 8),
      time: '2:00 PM',
      location: 'Room 205',
      color: '#10b981',
    },
    {
      id: '3',
      title: 'Integration Testing Workshop',
      subject: 'Software Testing',
      date: new Date(2026, 4, 12),
      time: '9:00 AM',
      location: 'Lab 302',
      color: '#3b82f6',
    },
    {
      id: '4',
      title: 'Database Project Due',
      subject: 'Database Systems',
      date: new Date(2026, 4, 15),
      time: '11:59 PM',
      color: '#f59e0b',
    },
    {
      id: '5',
      title: 'REST API Assignment',
      subject: 'Java Spring Boot',
      date: new Date(2026, 4, 18),
      time: '5:00 PM',
      location: 'Online',
      color: '#10b981',
    },
    {
      id: '6',
      title: 'Web Dev Presentation',
      subject: 'Web Development',
      date: new Date(2026, 4, 20),
      time: '3:00 PM',
      location: 'Auditorium',
      color: '#8b5cf6',
    },
  ]);

  const upcomingEvents = events
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  const handleAddEvent = () => {
    console.log('Add new event clicked');
  };

  const handleAddSubject = () => {
    console.log('Add new subject clicked');
  };

  const handleDateClick = (date: Date) => {
    console.log('Date clicked:', date);
  };

  return (
    <div className="size-full flex bg-[#0f1423] dark">
      <LeftSidebar subjects={subjects} onAddSubject={handleAddSubject} />
      <CalendarView events={events} onDateClick={handleDateClick} />
      <RightSidebar
        upcomingEvents={upcomingEvents}
        user={{ name: 'Alex', msv: '20261...' }}
      />
      <FloatingAddButton onClick={handleAddEvent} />
    </div>
  );
}
