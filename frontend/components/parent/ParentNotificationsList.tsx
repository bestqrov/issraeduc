import { ParentData } from '@/lib/mockData';
import { Bell, CreditCard, GraduationCap, Info, Calendar } from 'lucide-react';

interface ParentNotificationsListProps {
    parent: ParentData;
}

export default function ParentNotificationsList({ parent }: ParentNotificationsListProps) {
    const getIcon = (type?: string) => {
        switch (type) {
            case 'payment': return <CreditCard size={18} className="text-emerald-500" />;
            case 'academic': return <GraduationCap size={18} className="text-blue-500" />;
            default: return <Info size={18} className="text-slate-500" />;
        }
    };

    const getBgColor = (type?: string) => {
        switch (type) {
            case 'payment': return 'bg-emerald-50';
            case 'academic': return 'bg-blue-50';
            default: return 'bg-slate-50';
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Centre de Notifications</h2>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-50">
                {parent.notifications.length > 0 ? (
                    parent.notifications.map((notif) => (
                        <div key={notif.id} className={`p-6 hover:bg-slate-50/50 transition-all group ${!notif.read ? 'bg-blue-50/30' : ''}`}>
                            <div className="flex gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${getBgColor(notif.type)}`}>
                                    {getIcon(notif.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className={`font-bold text-slate-900 ${!notif.read ? 'text-blue-900 font-black' : ''}`}>
                                            {notif.title}
                                            {!notif.read && (
                                                <span className="ml-2 inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                            )}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                                            <Calendar size={12} />
                                            {new Date(notif.date).toLocaleDateString('fr-FR', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {notif.message}
                                    </p>
                                    <div className="mt-3 flex items-center gap-3">
                                        <button className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
                                            {notif.read ? 'Marquer comme non lu' : 'Marquer comme lu'}
                                        </button>
                                        <button className="text-[10px] font-bold uppercase tracking-widest text-red-300 hover:text-red-500 transition-colors">
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-12 text-center text-slate-400">
                        <Bell size={48} className="mx-auto mb-4 opacity-10" />
                        <p className="font-medium">Aucune notification pour le moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
