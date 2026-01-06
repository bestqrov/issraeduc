import { StudentData } from '@/lib/mockData';
import { ChevronRight } from 'lucide-react';

interface OngoingCoursesCardProps {
    student: StudentData;
}

export default function OngoingCoursesCard({ student }: OngoingCoursesCardProps) {
    const getColorClass = (color: string) => {
        const colors: Record<string, string> = {
            orange: 'border-l-orange-500',
            blue: 'border-l-blue-500',
            purple: 'border-l-purple-500',
            green: 'border-l-green-500',
            pink: 'border-l-pink-500',
        };
        return colors[color] || 'border-l-gray-500';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Cours en Cours</h3>
            <p className="text-sm text-gray-500 mb-6">{student.ongoingCourses.length} cours actuellement suivis</p>

            <div className="space-y-3">
                {student.ongoingCourses.map((course) => (
                    <div
                        key={course.id}
                        className={`border-l-4 ${getColorClass(course.color)} bg-gray-50 p-4 rounded-r-lg hover:shadow-md transition-shadow cursor-pointer`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 text-sm">{course.name}</h4>
                                <p className="text-xs text-gray-500 mt-1">
                                    {formatDate(course.startDate)} - {formatDate(course.endDate)}
                                </p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
