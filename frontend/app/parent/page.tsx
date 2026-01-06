'use client';

import { useState, useEffect } from 'react';
import {
    Search,
    Users,
    Phone,
    Mail,
    Plus,
    UserCircle,
    ArrowRight,
    Edit2,
    Trash2,
    X,
    Save,
    Link as LinkIcon,
    Copy,
    Check
} from 'lucide-react';
import { getParents, deleteParent, updateParent, createParent, Parent } from '@/lib/services/parents';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { usePathname } from 'next/navigation';

export default function ParentsPage() {
    const [parents, setParents] = useState<Parent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingParent, setEditingParent] = useState<Parent | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        cin: '',
        whatsapp: ''
    });
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        fetchParents();
    }, []);

    const fetchParents = async () => {
        setIsLoading(true);
        try {
            const data = await getParents();
            setParents(data || []);
        } catch (error) {
            console.error('Failed to fetch parents:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (parent: Parent | null = null) => {
        if (parent) {
            setEditingParent(parent);
            setFormData({
                name: parent.name || '',
                phone: parent.phone || '',
                email: parent.email || '',
                address: parent.address || '',
                cin: parent.cin || '',
                whatsapp: parent.whatsapp || ''
            });
        } else {
            setEditingParent(null);
            setFormData({
                name: '',
                phone: '',
                email: '',
                address: '',
                cin: '',
                whatsapp: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingParent) {
                await updateParent(editingParent.id, formData);
            } else {
                await createParent(formData);
            }
            setIsModalOpen(false);
            fetchParents();
        } catch (error) {
            console.error('Failed to save parent:', error);
            alert('Erreur lors de l’enregistrement');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce parent ?')) {
            try {
                await deleteParent(id);
                fetchParents();
            } catch (error) {
                console.error('Failed to delete parent:', error);
            }
        }
    };

    const copyLink = (link: string | undefined, id: string) => {
        if (!link) return;
        const fullLink = `${window.location.origin}/parent/view/${link}`;
        navigator.clipboard.writeText(fullLink);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const filteredParents = parents.filter(parent =>
        (parent.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (parent.phone || '').includes(searchQuery) ||
        (parent.email && parent.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar currentPath={pathname} />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <TopBar />
                <main className="flex-1 overflow-y-auto pt-16">
                    <div className="container mx-auto p-4 md:p-8 space-y-6 animate-in fade-in duration-500">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                    <UserCircle className="text-blue-600" size={28} />
                                    Gestion des Parents
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 mt-1">
                                    Consultez et gérez les profils des parents et leurs enfants.
                                </p>
                            </div>

                            <button
                                onClick={() => handleOpenModal()}
                                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20 transition-all font-semibold active:scale-95"
                            >
                                <Plus size={20} />
                                Nouveau Parent
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Rechercher un parent par nom, téléphone ou email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Parents Grid */}
                        {isLoading ? (
                            <div className="py-20 text-center">
                                <div className="flex justify-center items-center gap-3">
                                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                    <div className="text-slate-500">Chargement des parents...</div>
                                </div>
                            </div>
                        ) : filteredParents.length === 0 ? (
                            <div className="py-12 text-center text-slate-400">
                                <div className="mx-auto w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
                                    <Users size={32} className="opacity-50" />
                                </div>
                                <p className="font-medium">Aucun parent trouvé</p>
                                <p className="text-sm mt-1">Essayez de modifier votre recherche</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredParents.map((parent) => (
                                    <div
                                        key={parent.id}
                                        className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 overflow-hidden"
                                    >
                                        <div className="p-6 space-y-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.push(`/parent/${parent.id}`)}>
                                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-inner group-hover:scale-110 transition-transform">
                                                        {parent.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-blue-600 transition-colors">
                                                            {parent.name}
                                                        </h3>
                                                        <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1">
                                                            <Users size={14} className="text-blue-400" />
                                                            <span>{parent.students?.length || 0} Enfants</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleOpenModal(parent)}
                                                        className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(parent.id)}
                                                        className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-2 pt-2">
                                                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                                                        <Phone size={14} />
                                                    </div>
                                                    {parent.phone}
                                                </div>
                                                {parent.email && (
                                                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                                        <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                                                            <Mail size={14} />
                                                        </div>
                                                        <span className="truncate">{parent.email}</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-50 dark:border-slate-700/50">
                                                    <button
                                                        onClick={() => copyLink((parent as any).parentLink, parent.id)}
                                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-900 text-slate-500 hover:text-blue-600 rounded-lg text-xs font-bold transition-all"
                                                    >
                                                        {copiedId === parent.id ? <Check size={14} /> : <Copy size={14} />}
                                                        {copiedId === parent.id ? 'Copié' : 'Copier le lien'}
                                                    </button>
                                                    <button
                                                        onClick={() => router.push(`/parent/${parent.id}`)}
                                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg text-xs font-bold transition-all"
                                                    >
                                                        Détails
                                                        <ArrowRight size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Modal */}
                        {isModalOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                                <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-in zoom-in-95 duration-300">
                                    <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
                                        <h2 className="text-xl font-black text-slate-900 dark:text-white">
                                            {editingParent ? 'Modifier le Parent' : 'Nouveau Parent'}
                                        </h2>
                                        <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                                            <X size={24} />
                                        </button>
                                    </div>
                                    <form onSubmit={handleSubmit} className="p-8 space-y-5">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Nom Complet</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Téléphone</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">WhatsApp</label>
                                                    <input
                                                        type="text"
                                                        value={formData.whatsapp}
                                                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Email</label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Adresse</label>
                                                <input
                                                    type="text"
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">CIN</label>
                                                <input
                                                    type="text"
                                                    value={formData.cin}
                                                    onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-4 pt-4">
                                            <button
                                                type="button"
                                                onClick={() => setIsModalOpen(false)}
                                                className="flex-1 py-4 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-white font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                                            >
                                                Annuler
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Save size={20} />
                                                Enregistrer
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
