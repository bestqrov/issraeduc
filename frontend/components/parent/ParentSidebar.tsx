import { ParentData } from '@/lib/mockData';
import { Home, Users, Bell, FileText, CreditCard, LogOut } from 'lucide-react';

interface ParentSidebarProps {
    parent: ParentData;
    currentView: string;
    onViewChange: (view: string) => void;
}

export default function ParentSidebar({ parent, currentView, onViewChange }: ParentSidebarProps) {
    const menuItems = [
        { id: 'dashboard', icon: Home, label: 'Dashboard' },
        { id: 'enfants', icon: Users, label: 'Enfants' },
        { id: 'notifications', icon: Bell, label: 'Notification' },
        { id: 'absences', icon: FileText, label: 'Absence' },
        { id: 'paiements', icon: CreditCard, label: 'Paiements' },
    ];

    return (
        <div className="w-64 bg-gradient-to-b from-emerald-800 to-teal-900 text-white h-screen flex flex-col fixed left-0 top-0">
            {/* School Name */}
            <div className="p-6 border-b border-white/5 mb-2">
                <div className="flex items-center justify-center gap-2">
                    <span className="font-bold text-xl tracking-tight text-white">Arwa<span className="text-emerald-400">Educ</span></span>
                </div>
            </div>

            {/* Menu Utama */}
            <div className="px-4 mt-6">
                <p className="text-xs text-gray-300 uppercase tracking-wider px-3 mb-3">Menu Principal</p>
                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onViewChange(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${currentView === item.id
                                ? 'bg-emerald-700 text-white'
                                : 'text-gray-200 hover:bg-emerald-700/50'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-sm">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Logout Button */}
            <div className="mt-auto p-4">
                <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-lg transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-semibold">Log Out</span>
                </button>
            </div>
        </div>
    );
}
