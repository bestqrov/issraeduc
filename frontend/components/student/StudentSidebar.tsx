import { StudentData } from '@/lib/mockData';
import { Home, BookOpen, FileText, CreditCard, Settings, HelpCircle, LogOut } from 'lucide-react';

interface StudentSidebarProps {
    student: StudentData;
    currentView: string;
    onViewChange: (view: string) => void;
}

export default function StudentSidebar({ student, currentView, onViewChange }: StudentSidebarProps) {
    const menuItems = [
        { id: 'dashboard', icon: Home, label: 'Dashboard' },
        { id: 'cours', icon: BookOpen, label: 'Cours' },
        { id: 'absence', icon: FileText, label: 'Absence' },
        { id: 'paiements', icon: CreditCard, label: 'Paiements' },
        { id: 'emploi', icon: HelpCircle, label: 'Emploi de Temps' },
    ];

    return (
        <div className="w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-white h-screen flex flex-col fixed left-0 top-0">
            {/* School Name */}
            <div className="p-6 border-b border-white/5 mb-2">
                <div className="flex items-center justify-center gap-2">
                    <span className="font-bold text-xl tracking-tight text-white">Arwa<span className="text-orange-500">Educ</span></span>
                </div>
            </div>

            {/* Menu Principal */}
            <div className="px-4 mt-6">
                <p className="text-xs text-gray-400 uppercase tracking-wider px-3 mb-3">Menu Principal</p>
                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onViewChange(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${currentView === item.id
                                ? 'bg-slate-700 text-white shadow-lg'
                                : 'text-gray-300 hover:bg-slate-700/50'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-orange-500' : 'text-gray-400'}`} />
                            <span className="text-sm font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>



            {/* Logout Button */}
            <div className="mt-auto p-4">
                <button className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-semibold">Log Out</span>
                </button>
            </div>
        </div>
    );
}
