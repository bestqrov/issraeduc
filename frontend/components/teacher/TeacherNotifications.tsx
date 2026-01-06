'use client';

import { TeacherData, Notification } from '@/lib/mockData';
import { Bell, CheckCircle, Info, AlertTriangle, Clock } from 'lucide-react';

interface TeacherNotificationsProps {
    teacher: TeacherData;
}

export default function TeacherNotifications({ teacher }: TeacherNotificationsProps) {
    const getIcon = (type?: string) => {
        switch (type) {
            case 'urgent': return <AlertTriangle className="w-5 h-5 text-red-500" />;
            case 'admin': return <Clock className="w-5 h-5 text-purple-500" />;
            default: return <Bell className="w-5 h-5 text-blue-500" />;
        }
    };

    const getBgColor = (type?: string) => {
        switch (type) {
            case 'urgent': return 'bg-red-50 text-red-700 border-red-100';
            case 'admin': return 'bg-purple-50 text-purple-700 border-purple-100';
            default: return 'bg-blue-50 text-blue-700 border-blue-100';
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-800">Centre de Notifications</h3>
                <button className="text-sm font-bold text-orange-500 hover:underline">
                    Tout marquer comme lu
                </button>
            </div>

            <div className="space-y-4">
                {teacher.notifications.length > 0 ? (
                    teacher.notifications.map((notif) => (
                        <div
                            key={notif.id}
                            className={`p-6 rounded-2xl border transition-all hover:shadow-md cursor-pointer flex gap-5 ${notif.read ? 'bg-white border-slate-100 grayscale-[0.5]' : 'bg-white border-orange-100 shadow-sm border-l-4 border-l-orange-500'
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${notif.read ? 'bg-slate-100' : 'bg-orange-50'}`}>
                                {getIcon(notif.type)}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-1">
                                    <h4 className={`font-bold ${notif.read ? 'text-slate-600' : 'text-slate-900'}`}>{notif.title}</h4>
                                    <span className="text-xs font-medium text-slate-400 whitespace-nowrap">{notif.date}</span>
                                </div>
                                <p className={`text-sm leading-relaxed ${notif.read ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {notif.message}
                                </p>
                                {!notif.read && (
                                    <div className="mt-4 flex items-center gap-2">
                                        <button className="text-xs font-black uppercase tracking-widest text-orange-500 hover:text-orange-600">
                                            Consulter
                                        </button>
                                        <span className="text-slate-200">|</span>
                                        <button className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600">
                                            Marquer comme lu
                                        </button>
                                    </div>
                                )}
                            </div>
                            {!notif.read && (
                                <div className="w-2 h-2 rounded-full bg-orange-500 self-start mt-2" />
                            )}
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-2xl p-12 border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <Bell className="w-8 h-8 text-slate-300" />
                        </div>
                        <h4 className="font-bold text-slate-800">Aucune notification</h4>
                        <p className="text-slate-400 text-sm mt-1">Vous êtes à jour !</p>
                    </div>
                )}
            </div>
        </div>
    );
}
