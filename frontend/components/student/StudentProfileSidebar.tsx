import { StudentData } from '@/lib/mockData';
import { Calendar, Phone, MapPin } from 'lucide-react';

interface StudentProfileSidebarProps {
    student: StudentData;
}

export default function StudentProfileSidebar({ student }: StudentProfileSidebarProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <div className="w-80 bg-white rounded-xl shadow-lg p-6 fixed right-8 top-8 h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Student Photo */}
            <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-4">
                    {student.avatar}
                </div>
                <h2 className="text-xl font-bold text-gray-800">{student.name}</h2>
                <p className="text-sm text-gray-500">{student.username}</p>
            </div>

            {/* Personal Info */}
            <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Date de Naissance</p>
                        <p className="text-sm font-semibold text-gray-800">{formatDate(student.birthDate)}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Numéro de Téléphone</p>
                        <p className="text-sm font-semibold text-gray-800">{student.phone}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Adresse</p>
                        <p className="text-sm font-semibold text-gray-800">{student.address}</p>
                    </div>
                </div>
            </div>

            {/* About Me */}
            <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-800 mb-2">À Propos de Moi</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                    {student.aboutMe}
                </p>
            </div>

            {/* Parent Information */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl p-5 text-white">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold">Parent</h3>
                    <button className="text-white/80 hover:text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white font-semibold">
                        {student.parentName ? student.parentName.charAt(0).toUpperCase() : 'P'}
                    </div>
                    <div>
                        <p className="font-semibold text-sm">{student.parentName || 'Non spécifié'}</p>
                        <p className="text-xs text-white/70">
                            {student.parentRelation || 'Parent'} • {student.parentPhone || 'Téléphone non disponible'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
