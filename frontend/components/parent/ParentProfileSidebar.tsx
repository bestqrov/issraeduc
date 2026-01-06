import { ParentData } from '@/lib/mockData';
import { Calendar, Phone, MapPin } from 'lucide-react';

interface ParentProfileSidebarProps {
    parent: ParentData;
}

export default function ParentProfileSidebar({ parent }: ParentProfileSidebarProps) {
    return (
        <div className="w-80 bg-white rounded-xl shadow-lg p-6 fixed right-8 top-8 h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Parent Photo */}
            <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-4">
                    {parent.avatar}
                </div>
                <h2 className="text-xl font-bold text-gray-800">{parent.name}</h2>
                <p className="text-sm text-gray-500">Compte Parent</p>
            </div>

            {/* Personal Info */}
            <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Téléphone</p>
                        <p className="text-sm font-semibold text-gray-800">{parent.phone}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-semibold text-gray-800">{parent.email}</p>
                    </div>
                </div>
            </div>

            {/* Children Summary */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5">
                <h3 className="text-sm font-bold text-gray-800 mb-3">Mes Enfants</h3>
                <div className="space-y-2">
                    {parent.children.map((child) => (
                        <div key={child.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                                    {child.name.charAt(0)}
                                </div>
                                <span className="text-sm font-medium text-gray-700">{child.name.split(' ')[0]}</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${child.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                                child.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                                }`}>
                                {child.paymentStatus === 'paid' ? 'Payé' :
                                    child.paymentStatus === 'pending' ? 'En attente' : 'En retard'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
