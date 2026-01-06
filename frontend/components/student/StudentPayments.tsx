'use client';

import React from 'react';
import { StudentData } from '@/lib/mockData';
import { CreditCard, CheckCircle2, XCircle, Clock, Receipt, Banknote } from 'lucide-react';

interface StudentPaymentsProps {
    student: StudentData;
}

export default function StudentPayments({ student }: StudentPaymentsProps) {
    // Generate a simple status card based on student.paymentStatus
    const getStatusDetails = (status: string) => {
        switch (status) {
            case 'paid':
                return {
                    label: 'À Jour',
                    color: 'emerald',
                    icon: CheckCircle2,
                    desc: 'Vos frais de scolarité sont réglés pour ce mois.'
                };
            case 'overdue':
                return {
                    label: 'En Retard',
                    color: 'rose',
                    icon: XCircle,
                    desc: 'Action requise : Paiement de scolarité en attente.'
                };
            default:
                return {
                    label: 'En Attente',
                    color: 'orange',
                    icon: Clock,
                    desc: 'Paiement à prévoir prochainement.'
                };
        }
    };

    const status = getStatusDetails(student.paymentStatus);

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Scolarité & Paiements</h1>
                <p className="text-gray-500 text-sm">Consultez l'état de vos règlements mensuels</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Status Card */}
                <div className={`lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8`}>
                    <div className={`w-24 h-24 rounded-full bg-${status.color}-50 flex items-center justify-center text-${status.color}-500 flex-shrink-0 animate-pulse`}>
                        <status.icon className="w-12 h-12" />
                    </div>
                    <div className="text-center md:text-left space-y-2">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <h2 className="text-2xl font-bold text-gray-800">Statut: {status.label}</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed max-w-md">{status.desc}</p>
                        <div className="pt-2">
                            <button className={`bg-${status.color}-500 hover:bg-${status.color}-600 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg shadow-${status.color}-200`}>
                                Voir les détails
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Info */}
                <div className="space-y-4">
                    <div className="bg-slate-800 rounded-2xl p-6 text-white shadow-xl">
                        <div className="flex justify-between items-start mb-4">
                            <Banknote className="w-8 h-8 text-orange-400" />
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Scolarité</span>
                        </div>
                        <p className="text-slate-400 text-sm mb-1 font-medium">Frais Mensuels</p>
                        <h3 className="text-3xl font-bold">1,200 <span className="text-lg font-medium text-slate-500">DH</span></h3>
                    </div>

                    <button className="w-full bg-white hover:bg-gray-50 text-gray-700 py-4 px-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-colors group">
                        <div className="flex items-center gap-3">
                            <Receipt className="w-5 h-5 text-gray-400 group-hover:text-orange-500" />
                            <span className="font-semibold text-sm">Dernier Reçu</span>
                        </div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-tighter">PDF</div>
                    </button>
                </div>
            </div>

            {/* Note to User */}
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex gap-4">
                <Clock className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <div className="space-y-1">
                    <h4 className="text-sm font-bold text-blue-800">Note Importante</h4>
                    <p className="text-xs text-blue-600 leading-relaxed">
                        Pour tout règlement, veuillez vous présenter à l'accueil muni de votre carte d'étudiant.
                        Les paiements par virement bancaire sont également acceptés. Contactez l'administration pour plus d'informations.
                    </p>
                </div>
            </div>
        </div>
    );
}
