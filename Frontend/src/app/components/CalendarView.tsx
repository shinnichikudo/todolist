import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  color: string;
}

interface CalendarViewProps {
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
}

export default function CalendarView({ events, onDateClick }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const renderCalendarDays = () => {
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="bg-[#0a0e1a] border border-[#1a2332] min-h-[120px]" />
      );
    }

    // Actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEvents = getEventsForDate(date);
      const today = isToday(day);

      days.push(
        <div
          key={day}
          onClick={() => onDateClick(date)}
          className={`bg-[#0a0e1a] border border-[#1a2332] min-h-[120px] p-3 cursor-pointer hover:bg-[#141b2b] transition-colors ${
            today ? 'ring-2 ring-blue-600' : ''
          }`}
        >
          <div className={`text-sm mb-2 ${today ? 'text-blue-400' : 'text-gray-400'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="text-xs px-2 py-1 rounded truncate"
                style={{
                  backgroundColor: `${event.color}20`,
                  color: event.color,
                  borderLeft: `3px solid ${event.color}`
                }}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-gray-500 px-2">
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="flex-1 bg-[#0f1423] p-6 overflow-auto">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl">
          {monthNames[month]} {year}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={previousMonth}
            className="w-10 h-10 rounded-lg bg-[#1a2332] hover:bg-[#243145] text-gray-400 hover:text-white transition-colors flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-4 h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Today
          </button>
          <button
            onClick={nextMonth}
            className="w-10 h-10 rounded-lg bg-[#1a2332] hover:bg-[#243145] text-gray-400 hover:text-white transition-colors flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-[#0a0e1a] rounded-lg overflow-hidden border border-[#1a2332]">
        {/* Days of week header */}
        <div className="grid grid-cols-7 bg-[#141b2b]">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="py-3 text-center text-gray-400 text-sm border-r border-[#1a2332] last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7">
          {renderCalendarDays()}
        </div>
      </div>
    </div>
  );
}
