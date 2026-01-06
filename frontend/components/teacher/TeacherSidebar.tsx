'use client';

import { TeacherData } from '@/lib/mockData';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Calendar,
    Bell,
    LogOut,
    UserCircle
} from 'lucide-react';

interface TeacherSidebarProps {
    teacher: TeacherData;
    activeView: string;
    onViewChange: (view: string) => void;
}

export default function TeacherSidebar({ teacher, activeView, onViewChange }: TeacherSidebarProps) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'courses', label: 'Mes Cours', icon: BookOpen },
        { id: 'groups', label: 'Mes Groupes', icon: Users },
        { id: 'absences', label: 'Absences', icon: UserCircle },
        { id: 'schedule', label: 'Emploi du Temps', icon: Calendar },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#22284a] text-white flex flex-col z-50 shadow-2xl">
            {/* Branding */}
            <div className="p-8 border-b border-slate-700/50 flex flex-col items-center justify-center">
                <span className="text-2xl font-black tracking-tighter text-white">
                    Arwa<span className="text-orange-500">Educ</span>
                </span>
            </div>

            {/* Teacher Minimal Info (Navigation Focus) */}
            <div className="flex-1 px-4 py-8 space-y-2">
                <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                    Menu Principal
                </p>
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onViewChange(item.id)}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${isActive
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                            <span className="font-medium text-sm">{item.label}</span>
                            {item.id === 'notifications' && teacher.notifications.filter(n => !n.read).length > 0 && (
                                <span className="ml-auto bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                    {teacher.notifications.filter(n => !n.read).length}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-slate-700/50">
                <button className="w-full flex items-center gap-4 px-4 py-3.5 text-slate-400 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all duration-300 group">
                    <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-sm">Déconnexion</span>
                </button>
            </div>
        </aside>
    );
}
