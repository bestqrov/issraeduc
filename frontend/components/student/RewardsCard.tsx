import { StudentData } from '@/lib/mockData';

interface RewardsCardProps {
    student: StudentData;
}

export default function RewardsCard({ student }: RewardsCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Récompenses</h3>
            <p className="text-sm text-gray-500 mb-6">Récompenses obtenues: {student.rewards.filter(r => r.earned).length}/{student.rewards.length}</p>

            <div className="grid grid-cols-6 gap-3">
                {student.rewards.map((reward) => (
                    <div
                        key={reward.id}
                        className="group relative"
                    >
                        <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all cursor-pointer ${reward.earned
                                ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-md hover:scale-110'
                                : 'bg-gray-200 opacity-50 grayscale'
                                }`}
                        >
                            {reward.icon}
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                            {reward.name}
                            {reward.earned && reward.earnedDate && (
                                <div className="text-gray-300 text-xs">
                                    {new Date(reward.earnedDate).toLocaleDateString('fr-FR')}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
