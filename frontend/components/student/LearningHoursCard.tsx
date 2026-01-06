import { StudentData } from '@/lib/mockData';

interface LearningHoursCardProps {
    student: StudentData;
}

export default function LearningHoursCard({ student }: LearningHoursCardProps) {
    const percentage = (student.learningHours.thisWeek / student.learningHours.weeklyTarget) * 100;
    const circumference = 2 * Math.PI * 70;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Total Heures</h3>
            <p className="text-sm text-gray-500 mb-6">Heures de présence totales enregistrées</p>

            <div className="flex flex-col items-center">
                <div className="relative w-40 h-40">
                    <svg className="transform -rotate-90 w-40 h-40">
                        {/* Background circle */}
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="#f3f4f6"
                            strokeWidth="12"
                            fill="none"
                        />
                        {/* Progress circle */}
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="url(#hoursGradient)"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-1000"
                        />
                        <defs>
                            <linearGradient id="hoursGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#fb923c" />
                                <stop offset="100%" stopColor="#f97316" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-gray-800">{student.learningHours.total}</span>
                        <span className="text-sm text-gray-500">heures</span>
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <span className="text-gray-600">Cette semaine: {student.learningHours.thisWeek}h</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="text-gray-600">Objectif: {student.learningHours.weeklyTarget}h</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
