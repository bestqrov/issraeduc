import { StudentData } from '@/lib/mockData';

interface TeacherHistoryCardProps {
    student: StudentData;
}

export default function TeacherHistoryCard({ student }: TeacherHistoryCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Historique des Enseignants</h3>
            <p className="text-sm text-gray-500 mb-6">Liste de vos enseignants récents</p>

            <div className="flex items-center gap-3">
                {student.teacherHistory.map((teacher) => (
                    <div
                        key={teacher.id}
                        className="group relative"
                    >
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center text-white font-semibold shadow-md hover:scale-110 transition-transform cursor-pointer">
                            {teacher.avatar}
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {teacher.name}
                            <div className="text-gray-300 text-xs">{teacher.subject}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
