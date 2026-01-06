'use client';

import React, { useState } from 'react';
import { TeacherData } from '@/lib/mockData';
import TeacherSidebar from '@/components/teacher/TeacherSidebar';
import TeacherDashboard from '@/components/teacher/TeacherDashboard';
import TeacherCourses from '@/components/teacher/TeacherCourses';
import TeacherGroups from '@/components/teacher/TeacherGroups';
import TeacherSchedule from '@/components/teacher/TeacherSchedule';
import TeacherNotifications from '@/components/teacher/TeacherNotifications';
import TeacherAbsences from '@/components/teacher/TeacherAbsences';
import { UserCircle } from 'lucide-react';

interface TeacherPageClientProps {
    teacher: TeacherData;
}

export default function TeacherPageClient({ teacher }: TeacherPageClientProps) {
    const [currentView, setCurrentView] = useState('dashboard');

    const renderView = () => {
        switch (currentView) {
            case 'dashboard':
                return <TeacherDashboard teacher={teacher} />;
            case 'courses':
                return <TeacherCourses teacher={teacher} />;
            case 'groups':
                return <TeacherGroups teacher={teacher} onViewChange={setCurrentView} />;
            case 'absences':
                return <TeacherAbsences teacher={teacher} />;
            case 'schedule':
                return <TeacherSchedule teacher={teacher} />;
            case 'notifications':
                return <TeacherNotifications teacher={teacher} />;
            default:
                return <TeacherDashboard teacher={teacher} />;
        }
    };

    const getViewTitle = () => {
        switch (currentView) {
            case 'dashboard': return 'Tableau de Bord';
            case 'courses': return 'Mes Matières Enseignées';
            case 'groups': return 'Mes Groupes d\'Étudiants';
            case 'absences': return 'Gestion des Absences';
            case 'schedule': return 'Mon Emploi du Temps';
            case 'notifications': return 'Messages de l\'Administration';
            default: return 'Tableau de Bord';
        }
    };

    return (
        <div className="flex bg-[#f8fafc] min-h-screen font-sans">
            {/* Navigation Sidebar */}
            <TeacherSidebar
                teacher={teacher}
                activeView={currentView}
                onViewChange={setCurrentView}
            />

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-8 lg:p-12 overflow-y-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                            {getViewTitle()}
                        </h1>
                        <p className="text-slate-500 font-medium">
                            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>

                    {/* Teacher Profile Summary Token */}
                    <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/20">
                            {teacher.avatar}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-sm leading-tight">{teacher.name}</h4>
                            <p className="text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-tighter">{teacher.specialization}</p>
                        </div>
                    </div>
                </header>

                <div className="max-w-[1400px]">
                    {renderView()}
                </div>
            </main>
        </div>
    );
}
