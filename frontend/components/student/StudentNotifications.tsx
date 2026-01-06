import { StudentData } from '@/lib/mockData';

interface StudentNotificationsProps {
    student: StudentData;
}

export default function StudentNotifications({ student }: StudentNotificationsProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Notifications</h2>

            <div className="space-y-3">
                {student.notifications.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No notifications</p>
                ) : (
                    student.notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-4 rounded-lg border ${notification.read
                                    ? 'bg-gray-50 border-gray-200'
                                    : 'bg-blue-50 border-blue-200'
                                }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-gray-800">
                                            {notification.title}
                                        </h3>
                                        {!notification.read && (
                                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {notification.message}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2">
                                        {new Date(notification.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
