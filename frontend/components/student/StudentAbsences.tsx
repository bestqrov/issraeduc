'use client';

import React from 'react';
import { StudentData } from '@/lib/mockData';
import { Calendar, AlertCircle, CheckCircle, XCircle, FileText } from 'lucide-react';

interface StudentAbsencesProps {
    student: StudentData;
}

export default function StudentAbsences({ student }: StudentAbsencesProps) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Mes Absences</h1>
                    <p className="text-gray-500 text-sm">Suivi de votre assiduité scolaire</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex items-center gap-3">
                        <div className="p-2 bg-orange-500 rounded-lg text-white">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-orange-600 font-semibold uppercase">Total Absences</p>
                            <h3 className="text-xl font-bold text-orange-700">{student.absences.length}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Attendance Rate Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="relative w-20 h-20">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="40"
                                cy="40"
                                r="34"
                                fill="transparent"
                                stroke="#f1f5f9"
                                strokeWidth="8"
                            />
                            <circle
                                cx="40"
                                cy="40"
                                r="34"
                                fill="transparent"
                                stroke="#f97316"
                                strokeWidth="8"
                                strokeDasharray={`${student.stats.attendance * 2.13} 213`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-bold text-gray-800">{student.stats.attendance}%</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">Taux de Présence</h3>
                        <p className="text-sm text-gray-500">Votre assiduité est excellente ce trimestre.</p>
                    </div>
                </div>
                <button className="bg-slate-50 hover:bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-sm font-medium transition-colors border border-slate-200">
                    Détails Trimestre
                </button>
            </div>

            {/* History Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        Historique des Absences
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Motif</th>
                                <th className="px-6 py-4">Statut</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                            {student.absences.length > 0 ? (
                                student.absences.map((absence) => (
                                    <tr key={absence.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-700">{absence.date}</td>
                                        <td className="px-6 py-4 text-gray-600">{absence.reason}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${absence.status === 'Justifié'
                                                    ? 'bg-emerald-50 text-emerald-700'
                                                    : 'bg-rose-50 text-rose-700'
                                                }`}>
                                                {absence.status === 'Justifié' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                                {absence.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
                                                <FileText className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-gray-400 italic">
                                        Aucune absence enregistrée. Félicitations !
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
