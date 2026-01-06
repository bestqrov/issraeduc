'use client';

import { TeacherData } from '@/lib/mockData';
import {
    Users,
    BookOpen,
    Clock,
    Calendar,
    ArrowUpRight
} from 'lucide-react';

interface TeacherDashboardProps {
    teacher: TeacherData;
}

export default function TeacherDashboard({ teacher }: TeacherDashboardProps) {
    const stats = [
        { label: 'Total Étudiants', value: teacher.totalStudents, icon: Users, color: 'bg-blue-500' },
        { label: 'Groupes Actifs', value: teacher.activeGroups, icon: Calendar, color: 'bg-orange-500' },
        { label: 'Heures / Semaine', value: teacher.hoursThisWeek, icon: Clock, color: 'bg-purple-500' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header / Welcome */}
            {/* Note: Page title is handled in the PageClient/Layout */}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                            <div className={`${stat.color} p-4 rounded-xl text-white shadow-lg`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                                <h4 className="text-2xl font-bold text-slate-800">{stat.value}</h4>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* My Groups Listing */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Mes Groupes</h3>
                        <button className="text-orange-500 text-sm font-bold flex items-center gap-1 hover:underline">
                            Voir tout <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {teacher.groups.map((group) => (
                            <div key={group.id} className="p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer">
                                <div>
                                    <h4 className="font-bold text-slate-800">{group.name}</h4>
                                    <p className="text-xs text-slate-500 font-medium mt-1">
                                        {group.studentCount} étudiants • {group.level}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prochain Cours</p>
                                    <p className="text-sm font-bold text-orange-500">{group.nextClass}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Assigned Courses */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Mes Matières</h3>
                        <BookOpen className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="space-y-4">
                        {teacher.courses.map((course) => (
                            <div key={course.id} className="relative p-5 rounded-2xl bg-slate-50 overflow-hidden group">
                                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${course.color}`} />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-slate-800">{course.name}</h4>
                                        <p className="text-sm text-slate-500 mt-1">{course.studentCount} étudiants inscrits</p>
                                    </div>
                                    <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-slate-800 group-hover:text-white transition-colors">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
