import { Clock, MapPin, User } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  subject: string;
  date: Date;
  time: string;
  location?: string;
  color: string;
}

export interface UserProfile {
  email: string;
  msv: string;
  avatar?: string;
}

interface RightSidebarProps {
  upcomingEvents: Event[];
  user: UserProfile;
}

export default function RightSidebar({ upcomingEvents, user }: RightSidebarProps) {
  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="w-80 bg-[#0a0e1a] border-l border-[#1a2332] h-full flex flex-col">
      {/* User Profile */}
      <div className="p-6 border-b border-[#1a2332]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-white">{user?.email}</h3>
            <p className="text-gray-500 text-sm">MSV: {user?.msv}</p>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-4">
          Upcoming Events
        </h3>
        <div className="space-y-3">
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-600 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No upcoming events</p>
            </div>
          ) : (
            upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-[#141b2b] rounded-lg p-4 border border-[#1a2332] hover:border-blue-600/30 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-1 h-full rounded-full mt-1"
                    style={{ backgroundColor: event.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm mb-1 truncate">{event.title}</h4>
                    <p className="text-gray-400 text-xs mb-2">{event.subject}</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(event.date)} at {event.time}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
