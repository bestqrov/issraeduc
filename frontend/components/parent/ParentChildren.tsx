import { ParentData } from '@/lib/mockData';

interface ParentChildrenProps {
    parent: ParentData;
}

export default function ParentChildren({ parent }: ParentChildrenProps) {
    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'overdue':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPaymentStatusText = (status: string) => {
        switch (status) {
            case 'paid':
                return 'Payé';
            case 'pending':
                return 'En attente';
            case 'overdue':
                return 'En retard';
            default:
                return 'Inconnu';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Enfants</h2>

            <div className="space-y-4">
                {parent.children.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Aucun enfant enregistré</p>
                ) : (
                    parent.children.map((child) => (
                        <div
                            key={child.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                                        {child.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{child.name}</h3>
                                        <p className="text-sm text-gray-600">ID Étudiant: {child.id}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500 mb-1">Status de Paiement</p>
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(child.paymentStatus)}`}>
                                            {getPaymentStatusText(child.paymentStatus)}
                                        </span>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xs text-gray-500 mb-1">Absences</p>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="font-semibold text-gray-800">{child.absencesCount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
