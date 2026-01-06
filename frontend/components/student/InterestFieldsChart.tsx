import { StudentData } from '@/lib/mockData';

interface InterestFieldsChartProps {
    student: StudentData;
}

export default function InterestFieldsChart({ student }: InterestFieldsChartProps) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Matières de soutien</h3>
            <p className="text-sm text-gray-500 mb-6">Suivi des matières en soutien scolaire</p>

            <div className="space-y-4">
                {student.supportSubjects.map((subject, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">{subject.name}</span>
                            <span className="text-xs font-bold text-gray-400">{subject.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                                className={`${subject.color} h-3 rounded-full transition-all duration-500`}
                                style={{ width: `${subject.value}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
