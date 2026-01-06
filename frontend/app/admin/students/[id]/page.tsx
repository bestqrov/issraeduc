'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getStudentById, deleteStudent } from '@/lib/services/students';
import Button from '@/components/Button';
import { setStudentLink } from '@/lib/services/students';
import { Copy } from 'lucide-react';
import { Edit, Trash2, Link as LinkIcon, Calendar, Phone, Mail } from 'lucide-react';

export default function AdminStudentDetail({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { id } = params;
    const [student, setStudent] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const s = await getStudentById(id);
                setStudent(s);
            } catch (e: any) {
                console.error('Failed to load student', e);
                setError('Impossible de charger l\'élève');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const handleDelete = async () => {
        if (!confirm('Supprimer cet élève ?')) return;
        try {
            await deleteStudent(id);
            router.push('/admin/students');
        } catch (e) {
            console.error(e);
            setError('Échec lors de la suppression');
        }
    };

    const [slugLoading, setSlugLoading] = useState(false);
    const [publicLink, setPublicLink] = useState<string | null>(student?.studentLink ?? null);
    const [editingSlug, setEditingSlug] = useState(false);
    const [editSlugValue, setEditSlugValue] = useState('');

    const handleGenerateLink = async () => {
        try {
            setSlugLoading(true);
            const updated = await setStudentLink(id);
            setPublicLink(updated.studentLink);
            setStudent(updated);
        } catch (e: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
            console.error('Failed to set student link', e);
            const msg = e?.response?.data?.message || e?.message || 'Échec lors de la génération du lien';
            setError(msg);
            if (e?.response?.status === 401) alert('Non authentifié — connectez-vous.');
            else alert(msg);
        } finally {
            setSlugLoading(false);
        }
    };

    const handleSaveCustomSlug = async () => {
        if (!editSlugValue) return alert('Veuillez fournir un slug valide.');
        try {
            setSlugLoading(true);
            const updated = await setStudentLink(id, editSlugValue.trim());
            setPublicLink(updated.studentLink);
            setStudent(updated);
            setEditingSlug(false);
        } catch (e: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
            console.error('Failed to set custom slug', e);
            const msg = e?.response?.data?.message || e?.message || 'Échec lors de la mise à jour du slug';
            if (e?.response?.status === 401) alert('Non authentifié — connectez-vous.');
            else alert(msg);
        } finally {
            setSlugLoading(false);
        }
    };

    const handleCopyLink = async () => {
        if (!publicLink) return;
        try {
            await navigator.clipboard.writeText(`${window.location.origin}/student/${publicLink}`);
            // small feedback could be added
        } catch (e: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
            console.error('Copy failed', e);
        }
    };

    useEffect(() => {
        setPublicLink(student?.studentLink ?? null);
    }, [student]);

    const makeStudentSlug = (s: any) => {
        const namePart = (s.name || '').toString().trim();
        const idPart = (s.id || '').toString().slice(0, 4);
        const raw = s.studentLink ? s.studentLink : `${namePart}-${idPart}`;
        return raw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    if (loading) return <div className="p-6">Chargement...</div>;
    if (!student) return <div className="p-6 text-red-600">{error || 'Élève introuvable'}</div>;

    return (
        <div className="p-6 space-y-6">
            {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded">{error}</div>
            )}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{student.name} {student.surname}</h1>
                    <p className="text-sm text-gray-500">Inscrit le {new Date(student.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={() => window.open(`/student/${publicLink ?? student.id}`, '_blank')} className="flex items-center gap-2">
                        <LinkIcon size={16} /> Voir tableau élève
                    </Button>
                    <Button onClick={() => router.push(`/admin/students?highlight=${id}`)} className="flex items-center gap-2">
                        <Edit size={16} /> Retour à la liste
                    </Button>
                    <Button onClick={handleDelete} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white">
                        <Trash2 size={16} /> Supprimer
                    </Button>
                </div>

                <div className="mt-4 flex items-center gap-3">
                    {publicLink ? (
                        <div className="flex items-center gap-2">
                            {!editingSlug ? (
                                <>
                                    <input readOnly value={`${typeof window !== 'undefined' ? window.location.origin : ''}/student/${publicLink}`} className="px-3 py-2 border rounded-md w-80 text-sm" />
                                    <button onClick={handleCopyLink} className="px-3 py-2 bg-slate-100 rounded-md text-sm flex items-center gap-2">
                                        <Copy size={14} /> Copier
                                    </button>
                                    <button onClick={() => { setEditingSlug(true); setEditSlugValue(publicLink); }} className="px-3 py-2 bg-white border rounded-md text-sm">
                                        Éditer
                                    </button>
                                    <button onClick={handleGenerateLink} disabled={slugLoading} className="px-3 py-2 bg-white border rounded-md text-sm">
                                        Régénérer
                                    </button>
                                </>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <input value={editSlugValue} onChange={(e) => setEditSlugValue(e.target.value)} className="px-3 py-2 border rounded-md w-80 text-sm" />
                                    <button onClick={handleSaveCustomSlug} disabled={slugLoading} className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm">Sauvegarder</button>
                                    <button onClick={() => { setEditingSlug(false); setEditSlugValue(publicLink || ''); }} className="px-3 py-2 bg-slate-100 rounded-md text-sm">Annuler</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <button onClick={handleGenerateLink} disabled={slugLoading} className="px-3 py-2 bg-blue-600 text-white rounded-md">
                                {slugLoading ? 'Génération...' : 'Générer le lien public'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Identité</h3>
                    <p><strong>Nom complet:</strong> {student.name} {student.surname}</p>
                    <p className="mt-1"><strong>CIN:</strong> {student.cin || '—'}</p>
                    <p className="mt-1"><strong>Date de naissance:</strong> {student.birthDate ? new Date(student.birthDate).toLocaleDateString() : '—'}</p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Contact</h3>
                    <p className="flex items-center gap-2"><Mail size={14} /> {student.email || '—'}</p>
                    <p className="flex items-center gap-2 mt-2"><Phone size={14} /> {student.phone || '—'}</p>
                    <p className="mt-2"><strong>Adresse:</strong> {student.address || '—'}</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Détails académiques</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <p className="text-xs text-gray-500">Niveau</p>
                        <p className="font-medium">{student.schoolLevel || '—'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">École actuelle</p>
                        <p className="font-medium">{student.currentSchool || '—'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Statut</p>
                        <p className="font-medium">{student.active ? 'Actif' : 'Inactif'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
