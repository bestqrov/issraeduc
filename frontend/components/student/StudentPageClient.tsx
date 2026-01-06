'use client';

import React, { useState } from 'react';
import { StudentData } from '@/lib/mockData';
import StudentSidebar from '@/components/student/StudentSidebar';
import StudentProfileSidebar from '@/components/student/StudentProfileSidebar';
import StudentDashboard from '@/components/student/StudentDashboard';
import StudentCourses from '@/components/student/StudentCourses';
import StudentAbsences from '@/components/student/StudentAbsences';
import StudentPayments from '@/components/student/StudentPayments';
import StudentSchedule from '@/components/student/StudentSchedule';

interface StudentPageClientProps {
    student: StudentData;
}

export default function StudentPageClient({ student }: StudentPageClientProps) {
    const [currentView, setCurrentView] = useState('dashboard');

    const renderView = () => {
        switch (currentView) {
            case 'dashboard':
                return <StudentDashboard student={student} />;
            case 'cours':
                return <StudentCourses student={student} />;
            case 'absence':
                return <StudentAbsences student={student} />;
            case 'paiements':
                return <StudentPayments student={student} />;
            case 'emploi':
                return <StudentSchedule student={student} />;
            default:
                return <StudentDashboard student={student} />;
        }
    };

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
            <StudentSidebar
                student={student}
                currentView={currentView}
                onViewChange={setCurrentView}
            />

            <main className="flex-1 ml-64 mr-80 p-8">
                {renderView()}
            </main>

            <StudentProfileSidebar student={student} />
        </div>
    );
}
