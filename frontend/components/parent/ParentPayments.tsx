import { ParentData } from '@/lib/mockData';
import { CreditCard, Calendar, CheckCircle, Clock, AlertCircle, Receipt } from 'lucide-react';

interface ParentPaymentsProps {
    parent: ParentData;
}

export default function ParentPayments({ parent }: ParentPaymentsProps) {
    const totalPaid = parent.payments.reduce((sum, p) => p.status === 'Payé' ? sum + p.amount : sum, 0);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Historique des Paiements</h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <CheckCircle size={20} />
                        </div>
                        <span className="text-sm font-medium opacity-90">Total Versé</span>
                    </div>
                    <p className="text-3xl font-black">{totalPaid} MAD</p>
                    <p className="text-xs mt-2 opacity-80">Année scolaire 2025-2026</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-4 text-amber-600">
                        <div className="p-2 bg-amber-50 rounded-lg">
                            <Clock size={20} />
                        </div>
                        <span className="text-sm font-bold opacity-90">Paiement en Attente</span>
                    </div>
                    <p className="text-3xl font-black text-slate-800">
                        {parent.children.some(c => c.paymentStatus === 'pending') ? 'Requis' : 'Aucun'}
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-4 text-blue-600">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Receipt size={20} />
                        </div>
                        <span className="text-sm font-bold opacity-90">Dernière Transaction</span>
                    </div>
                    <p className="text-3xl font-black text-slate-800">{parent.payments[0]?.amount || 0} MAD</p>
                    <p className="text-xs mt-2 text-slate-400 font-medium">Le {new Date(parent.payments[0]?.date || '').toLocaleDateString('fr-FR')}</p>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-50">
                    <h3 className="text-lg font-bold text-slate-800">Toutes les Transactions</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">ID Transaction</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Mois / Période</th>
                                <th className="px-6 py-4">Montant</th>
                                <th className="px-6 py-4">Méthode</th>
                                <th className="px-6 py-4">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {parent.payments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-slate-700 font-mono text-sm uppercase">#{payment.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                                            <Calendar size={14} className="text-slate-400" />
                                            {new Date(payment.date).toLocaleDateString('fr-FR')}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-semibold text-slate-800">{payment.month}</span>
                                        <div className="text-[10px] text-slate-400 mt-0.5">{payment.subjects.join(', ')}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-black text-slate-900">
                                        {payment.amount} MAD
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                                            <CreditCard size={12} /> {payment.method}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${payment.status === 'Payé'
                                                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                                : payment.status === 'En retard' ? 'bg-red-50 text-red-700 border border-red-100'
                                                    : 'bg-amber-50 text-amber-700 border border-amber-100'
                                            }`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
