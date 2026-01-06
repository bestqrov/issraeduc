import { ParentData } from '@/lib/mockData';
import { Calendar, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

interface ParentAbsencesProps {
    parent: ParentData;
}

export default function ParentAbsences({ parent }: ParentAbsencesProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Suivi des Absences</h2>

            <div className="grid grid-cols-1 gap-8">
                {parent.children.map((child) => (
                    <div key={child.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center font-bold text-slate-700 border border-slate-200">
                                    {child.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{child.name}</h3>
                                    <p className="text-xs text-slate-500">{child.schoolLevel}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Absences</p>
                                <p className="text-xl font-black text-slate-700">{child.absences.length}</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-50">
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Raison / Motif</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Statut</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {child.absences.length > 0 ? (
                                        child.absences.map((absence) => (
                                            <tr key={absence.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-slate-700">
                                                        <Calendar size={14} className="text-slate-400" />
                                                        <span className="font-medium">
                                                            {new Date(absence.date).toLocaleDateString('fr-FR', {
                                                                day: 'numeric',
                                                                month: 'long',
                                                                year: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-slate-600 italic">"{absence.reason}"</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${absence.status === 'Justifié'
                                                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                                            : 'bg-red-50 text-red-700 border border-red-100'
                                                        }`}>
                                                        {absence.status === 'Justifié'
                                                            ? <CheckCircle2 size={12} />
                                                            : <AlertCircle size={12} />
                                                        }
                                                        {absence.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3} className="px-6 py-8 text-center text-slate-400 italic">
                                                Aucune absence enregistrée pour {child.name}.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
