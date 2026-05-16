import { Plus } from 'lucide-react';

interface FloatingAddButtonProps {
  onClick: () => void;
}

export default function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-lg shadow-blue-900/50 hover:shadow-xl hover:shadow-blue-900/60 transition-all flex items-center justify-center group"
      aria-label="Add new event"
    >
      <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
    </button>
  );
}
