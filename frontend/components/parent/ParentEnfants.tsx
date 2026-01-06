import { ParentData } from '@/lib/mockData';
import { User, BookOpen, CheckCircle, XCircle } from 'lucide-react';

interface ParentEnfantsProps {
    parent: ParentData;
}

export default function ParentEnfants({ parent }: ParentEnfantsProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Mes Enfants</h2>

            <div className="grid grid-cols-1 gap-6">
                {parent.children.map((child) => (
                    <div key={child.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        {/* Header */}
                        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
                                    {child.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{child.name}</h3>
                                    <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${child.status === 'Actif' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {child.status}
                                        </span>
                                        <span className="text-slate-300">|</span>
                                        <span>ID: {child.id}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end">
                                <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border-2 ${child.schoolLevel === 'LYCEE' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                                        child.schoolLevel === 'COLLEGE' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                            'bg-amber-50 text-amber-700 border-amber-100'
                                    }`}>
                                    {child.schoolLevel}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Subjects */}
                            <div>
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <BookOpen size={16} /> Matières Inscrites
                                </h4>
                                <div className="space-y-3">
                                    {child.subjects.map((subject, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                                            <span className="font-semibold text-slate-800">{subject.name}</span>
                                            <span className="text-slate-600 font-bold">{subject.price} MAD</span>
                                        </div>
                                    ))}
                                    <div className="pt-3 border-t border-dashed border-slate-200 flex justify-between items-center">
                                        <span className="text-slate-500 font-bold">Total Mensuel</span>
                                        <span className="text-indigo-600 font-black text-lg">
                                            {child.subjects.reduce((sum, s) => sum + s.price, 0)} MAD
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Summary Stats */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <CheckCircle size={16} /> Aperçu Scolaire
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                                        <p className="text-xs text-orange-600 font-bold uppercase mb-1">Absences</p>
                                        <p className="text-2xl font-black text-orange-700">{child.absencesCount}</p>
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                        <p className="text-xs text-blue-600 font-bold uppercase mb-1">Paiement</p>
                                        <p className={`text-sm font-black uppercase ${child.paymentStatus === 'paid' ? 'text-emerald-600' :
                                                child.paymentStatus === 'pending' ? 'text-amber-600' : 'text-red-600'
                                            }`}>
                                            {child.paymentStatus === 'paid' ? 'À Jour' :
                                                child.paymentStatus === 'pending' ? 'En Attente' : 'En Retard'}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-xs text-slate-500 font-bold uppercase mb-2">Dernière activité</p>
                                    <p className="text-sm text-slate-700 font-medium">Cours de {child.subjects[0].name} suivi avec succès.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
