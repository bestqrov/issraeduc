'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    FileText,
    Download,
    Trash2,
    Users,
    GraduationCap,
    BookOpen,
    Edit,
    Phone,
    Mail,
    User as UserIcon,
    Shield,
    Calendar,
    ArrowRight,
    Link,
    Eye
} from 'lucide-react';
import { getStudents, deleteStudent, setStudentLink } from '@/lib/services/students';
import { useRouter } from 'next/navigation';
import { groupsService } from '@/lib/services/groups'; // Adjust path if needed
import AddStudentForm from '@/components/forms/AddStudentForm'; // Adjust path
import StudentGroupModal from '@/components/StudentGroupModal'; // Adjust path

export default function StudentsPage() {
    const searchParams = useSearchParams();
    const highlightStudentId = searchParams.get('highlight');
    const router = useRouter();
    const [students, setStudents] = useState<any[]>([]);
    const [slugMap, setSlugMap] = useState<Record<string, { loading: boolean; slug?: string }>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterLevel, setFilterLevel] = useState('ALL');
    const [filterDate, setFilterDate] = useState<string>('');
    const [showFilters, setShowFilters] = useState(false);

    // View Switching State
    const [isAddMode, setIsAddMode] = useState(false); // Replaces isModalOpen
    const [editingStudent, setEditingStudent] = useState<any | null>(null);

    // Group Modal State (Keeping as modal for now)
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
    const [selectedStudentForGroup, setSelectedStudentForGroup] = useState<any>(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    // Handle highlighting a specific student
    useEffect(() => {
        if (highlightStudentId && students.length > 0) {
            const studentElement = document.getElementById(`student-${highlightStudentId}`);
            if (studentElement) {
                studentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                studentElement.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50');
                // Remove highlight after 3 seconds
                setTimeout(() => {
                    studentElement.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
                }, 3000);
            }
        }
    }, [highlightStudentId, students]);

    const fetchStudents = async () => {
        setIsLoading(true);
        try {
            const data = await getStudents();
            setStudents(data);
            // populate slug map
            const map: Record<string, { loading: boolean; slug?: string }> = {};
            data.forEach((s: any) => { map[s.id] = { loading: false, slug: s.studentLink ?? undefined }; });
            setSlugMap(map);
        } catch (error) {
            console.error('Failed to fetch students:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet élève ?')) {
            try {
                await deleteStudent(id);
                fetchStudents();
            } catch (error) {
                console.error('Failed to delete student:', error);
            }
        }
    };

    const handleEdit = (student: any) => {
        setEditingStudent(student);
        setIsAddMode(true);
    };

    const handleOpenGroupModal = (student: any) => {
        setSelectedStudentForGroup(student);
        setIsGroupModalOpen(true);
    };

    const handleGenerateRowLink = async (student: any) => {
        try {
            setSlugMap(prev => ({ ...prev, [student.id]: { ...(prev[student.id] || {}), loading: true } }));
            const updated = await setStudentLink(student.id);
            // update students list
            setStudents(prev => prev.map(s => s.id === updated.id ? updated : s));
            setSlugMap(prev => ({ ...prev, [updated.id]: { loading: false, slug: updated.studentLink } }));
        } catch (e: any) {
            console.error('Failed to generate link for student', e);
            setSlugMap(prev => ({ ...prev, [student.id]: { ...(prev[student.id] || {}), loading: false } }));
            const msg = e?.response?.data?.message || e?.message || 'Erreur lors de la génération du lien';
            if (e?.response?.status === 401) alert('Non authentifié — connectez-vous.');
            else alert(msg);
        }
    };

    const handleCloseAddView = () => {
        setIsAddMode(false);
        setEditingStudent(null);
    };

    const handleStudentAdded = () => {
        fetchStudents();
        handleCloseAddView();
    };

    const makeStudentSlug = (s: any) => {
        const namePart = (s.name || '').toString().trim();
        const idPart = (s.id || '').toString().slice(0, 4);
        const raw = s.studentLink ? s.studentLink : `${namePart}-${idPart}`;
        return raw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    const filteredStudents = students.filter(student => {
        const matchesSearch =
            (`${student.name || ''} ${student.surname || ''}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (student.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (student.parentName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (student.phone || '').toString().includes(searchQuery)); // Phone might be number or string
        const matchesLevel = filterLevel === 'ALL' || student.schoolLevel === filterLevel;
        const matchesDate = !filterDate || (student.createdAt && new Date(student.createdAt).toISOString().slice(0, 10) === filterDate);
        return matchesSearch && matchesLevel && matchesDate;
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Context Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {isAddMode
                            ? (editingStudent ? 'Modifier l\'Élève' : 'Nouvel Élève')
                            : 'Gestion des Élèves'
                        }
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        {isAddMode
                            ? 'Remplissez les informations ci-dessous'
                            : 'Gérez les inscriptions et les dossiers scolaires'
                        }
                    </p>
                </div>

                {!isAddMode && (
                    <div className="flex gap-3">
                        <button className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 bg-white shadow-sm">
                            <Download size={20} />
                        </button>
                    </div>
                )}
            </div>

            {/* Statistics Row */}
            {!isAddMode && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Élèves</p>
                            <p className="text-2xl font-black text-slate-900 dark:text-white">{students.length}</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <Shield size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Élèves Actifs</p>
                            <p className="text-2xl font-black text-slate-900 dark:text-white">
                                {students.filter(s => s.active).length}
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                            <GraduationCap size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Niveaux Gérés</p>
                            <p className="text-2xl font-black text-slate-900 dark:text-white">3</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">

                {/* LIST VIEW */}
                {!isAddMode && (
                    <>
                        {/* Filters Bar */}
                        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Rechercher par nom, email, téléphone..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                            <div className="flex gap-3">
                                <select
                                    value={filterLevel}
                                    onChange={(e) => setFilterLevel(e.target.value)}
                                    className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                                >
                                    <option value="ALL">Tous les niveaux</option>
                                    <option value="PRIMAIRE">Primaire</option>
                                    <option value="COLLEGE">Collège</option>
                                    <option value="LYCEE">Lycée</option>
                                </select>
                                <input
                                    type="date"
                                    value={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value)}
                                    className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                                    title="Filtrer par date d'inscription"
                                />
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`p-2 rounded-xl transition-colors ${showFilters ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                                >
                                    <Filter size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Cards Grid */}
                        <div className="p-6">
                            {isLoading ? (
                                <div className="py-20 text-center">
                                    <div className="flex justify-center items-center gap-3">
                                        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                        <div className="text-slate-500">Chargement des élèves...</div>
                                    </div>
                                </div>
                            ) : filteredStudents.length === 0 ? (
                                <div className="py-12 text-center text-slate-400">
                                    <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                                        <Search size={32} className="opacity-50" />
                                    </div>
                                    <p className="font-medium">Aucun élève trouvé</p>
                                    <p className="text-sm mt-1">Essayez de modifier vos filtres de recherche</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filteredStudents.map((student) => (
                                        <div key={student.id} id={`student-${student.id}`} className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                                                        {student.name?.charAt(0).toUpperCase() || '?'}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-900 dark:text-white text-base leading-tight">
                                                            {student.name} {student.surname}
                                                        </div>
                                                        <div className="text-xs text-slate-500 mt-1">Inscrit le {new Date(student.createdAt).toLocaleDateString()}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xs text-slate-400">{student.schoolLevel || '—'}</div>
                                                    <div className="text-xs mt-2">
                                                        <button onClick={() => window.open(`/student/${student.studentLink ?? student.id}`, '_blank')} className="text-green-600 hover:underline text-sm">Ouvrir</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-3 space-y-2">
                                                <div className="text-sm text-slate-500">
                                                    <div className="font-medium text-slate-900 dark:text-white">Tuteur: {student.parentName || '—'}</div>
                                                    <div className="text-xs">{student.parentPhone || '—'}</div>
                                                </div>

                                                <div className="flex flex-col gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lien Tableau de Bord</span>
                                                        <div className="flex items-center gap-1">
                                                            {student.studentLink ? (
                                                                <button
                                                                    onClick={async () => {
                                                                        const link = `${window.location.origin}/student/${student.studentLink}`;
                                                                        await navigator.clipboard.writeText(link);
                                                                        alert('Lien copié !');
                                                                    }}
                                                                    className="p-1.5 rounded-lg bg-white dark:bg-slate-800 text-blue-600 hover:text-blue-700 shadow-sm border border-slate-200 dark:border-slate-700 transition-all active:scale-90"
                                                                    title="Copier le lien"
                                                                >
                                                                    <Link size={14} />
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleGenerateRowLink(student)}
                                                                    disabled={slugMap[student.id]?.loading}
                                                                    className="text-[10px] font-bold text-blue-600 hover:underline"
                                                                >
                                                                    {slugMap[student.id]?.loading ? 'Génération...' : 'Générer'}
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => {
                                                                    const custom = window.prompt('Entrez un slug personnalisé (laisser vide pour générer automatiquement) :', student.studentLink || '');
                                                                    if (custom !== null) {
                                                                        (async () => {
                                                                            try {
                                                                                setSlugMap(prev => ({ ...prev, [student.id]: { ...(prev[student.id] || {}), loading: true } }));
                                                                                const updated = await setStudentLink(student.id, custom || undefined);
                                                                                setStudents(prev => prev.map(s => s.id === updated.id ? updated : s));
                                                                                setSlugMap(prev => ({ ...prev, [updated.id]: { loading: false, slug: updated.studentLink } }));
                                                                            } catch (e: any) {
                                                                                console.error(e);
                                                                                setSlugMap(prev => ({ ...prev, [student.id]: { ...(prev[student.id] || {}), loading: false } }));
                                                                                const msg = e?.response?.data?.message || e?.message || 'Erreur lors de la mise à jour du lien';
                                                                                alert(msg);
                                                                            }
                                                                        })();
                                                                    }
                                                                }}
                                                                className="p-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-600 hover:text-slate-700 shadow-sm border border-slate-200 dark:border-slate-700 transition-all"
                                                                title="Éditer le slug"
                                                            >
                                                                <Edit size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="text-[11px] text-slate-500 font-mono truncate">
                                                        {student.studentLink
                                                            ? `${window.location.origin}/student/${student.studentLink}`
                                                            : 'Pas de lien généré'
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex items-center justify-end gap-2">
                                                <button onClick={() => handleEdit(student)} className="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-sm">Modifier</button>
                                                <button onClick={() => handleDelete(student.id)} className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-sm">Supprimer</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* ADD/EDIT FORM VIEW (Replaces List View) */}
                {isAddMode && (
                    <div className="p-6 md:p-8 animate-in slide-in-from-right-4 duration-300">
                        <div className="max-w-4xl mx-auto">
                            <div className="mb-8 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                        {editingStudent ? 'Modification du dossier' : 'Formulaire d&apos;inscription'}
                                    </h2>
                                    <p className="text-sm text-slate-500">
                                        Saisissez les informations personnelles et académiques
                                    </p>
                                </div>
                                <button
                                    onClick={handleCloseAddView}
                                    className="text-sm text-slate-500 hover:text-slate-900 underline underline-offset-4"
                                >
                                    Annuler et retour
                                </button>
                            </div>

                            <AddStudentForm
                                onSuccess={handleStudentAdded}
                                initialData={editingStudent}
                            // Pass any other necessary props to AddStudentForm if needed
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Group Assignment Modal (Still a modal as it's a quick action) */}
            {isGroupModalOpen && (
                <StudentGroupModal
                    isOpen={isGroupModalOpen}
                    onClose={() => setIsGroupModalOpen(false)}
                    student={selectedStudentForGroup}
                />
            )}
        </div>
    );
}
