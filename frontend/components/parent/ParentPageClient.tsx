'use client';

import { useState } from 'react';
import { ParentData } from '@/lib/mockData';
import ParentSidebar from '@/components/parent/ParentSidebar';
import ParentDashboard from '@/components/parent/ParentDashboard';
import ParentProfileSidebar from '@/components/parent/ParentProfileSidebar';
import ParentEnfants from '@/components/parent/ParentEnfants';
import ParentAbsences from '@/components/parent/ParentAbsences';
import ParentPayments from '@/components/parent/ParentPayments';
import ParentNotificationsList from '@/components/parent/ParentNotificationsList';

interface ParentPageClientProps {
    parent: ParentData;
}

export default function ParentPageClient({ parent }: ParentPageClientProps) {
    const [currentView, setCurrentView] = useState('dashboard');

    const renderContent = () => {
        switch (currentView) {
            case 'enfants':
                return <ParentEnfants parent={parent} />;
            case 'absences':
                return <ParentAbsences parent={parent} />;
            case 'paiements':
                return <ParentPayments parent={parent} />;
            case 'notifications':
                return <ParentNotificationsList parent={parent} />;
            default:
                return <ParentDashboard parent={parent} />;
        }
    };

    const getViewTitle = () => {
        switch (currentView) {
            case 'enfants': return 'Mes Enfants';
            case 'absences': return 'Suivi des Absences';
            case 'paiements': return 'Historique des Paiements';
            case 'notifications': return 'Notifications';
            default: return 'Tableau de Bord Parent';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Left Sidebar - Fixed */}
            <ParentSidebar
                parent={parent}
                currentView={currentView}
                onViewChange={setCurrentView}
            />

            {/* Main Content - Center */}
            <div className="ml-64 mr-96 p-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">{getViewTitle()}</h1>
                    <p className="text-gray-600">Bienvenue, {parent.name.split(' ')[0]}!</p>
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {renderContent()}
                </div>
            </div>

            {/* Right Sidebar - Fixed */}
            <ParentProfileSidebar parent={parent} />
        </div>
    );
}
