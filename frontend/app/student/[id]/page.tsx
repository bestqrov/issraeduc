'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import StudentPageClient from '@/components/student/StudentPageClient';
import api from '@/lib/api';
import { StudentData, SupportSubject, OngoingCourse, ChildAbsence } from '@/lib/mockData';

export default function StudentPage() {
    const params = useParams();
    const studentId = params.id as string;
    const [student, setStudent] = useState<StudentData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Helper functions for data transformation
    const calculatePaymentStatus = (payments: any[]): 'paid' | 'pending' | 'overdue' => {
        if (!payments || payments.length === 0) return 'pending';
        // Simple logic: if there are payments, assume paid
        // This could be enhanced with actual payment status logic
        return 'paid';
    };

    const calculateAttendanceRate = (attendances: any[]): number => {
        if (!attendances || attendances.length === 0) return 100;
        const presentCount = attendances.filter(a => a.present).length;
        return Math.round((presentCount / attendances.length) * 100);
    };

    const transformSubjectsToSupportSubjects = (subjects: Record<string, any>): SupportSubject[] => {
        const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4'];
        return Object.entries(subjects).map(([key, value], index) => ({
            name: key.replace(/_/g, ' ').toUpperCase(),
            value: typeof value === 'number' ? value : 75, // Default to 75 if not a number
            color: colors[index % colors.length],
        }));
    };

    const transformSubjectsToCourses = (subjects: Record<string, any>): OngoingCourse[] => {
        const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4'];
        return Object.entries(subjects).map(([key, value], index) => ({
            id: key,
            name: key.replace(/_/g, ' ').toUpperCase(),
            startDate: new Date().toISOString().split('T')[0], // Current date as start
            endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days later
            progress: 25, // Default progress
            color: colors[index % colors.length],
        }));
    };

    const transformAttendancesToAbsences = (attendances: any[]): ChildAbsence[] => { // eslint-disable-line @typescript-eslint/no-explicit-any
        return attendances
            .filter(a => !a.present)
            .map(a => ({
                id: a.id,
                date: new Date(a.date).toISOString().split('T')[0],
                reason: a.reason || 'Absent',
                excused: a.excused || false,
                status: a.excused ? 'Justifié' : 'Non Justifié',
            }));
    };

    const calculateTotalHoursFromAttendance = (attendances: any[]): number => {
        // Assuming each attendance record represents 1 hour of class
        // Only count present attendances
        const presentAttendances = attendances.filter(a => a.present);
        return presentAttendances.length;
    };

    const calculateWeeklyHoursFromAttendance = (attendances: any[]): number => {
        // Calculate hours for the current week
        const now = new Date();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        startOfWeek.setHours(0, 0, 0, 0);

        const weeklyAttendances = attendances.filter(a => {
            const attendanceDate = new Date(a.date);
            return attendanceDate >= startOfWeek && a.present;
        });

        return weeklyAttendances.length;
    };

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                setLoading(true);

                // Try to fetch by link first, then by ID if that fails
                let response;
                try {
                    response = await api.get(`/students/link/${studentId}`);
                } catch (linkError) {
                    // If link doesn't work, try as ID
                    response = await api.get(`/students/${studentId}`);
                }

                if (response.data.success) {
                    // Transform the API response to match StudentData interface
                    const studentData = response.data.data;
                    const transformedStudent: StudentData = {
                        id: studentData.id,
                        name: studentData.name,
                        username: `${studentData.name} ${studentData.surname}`,
                        email: studentData.email || '',
                        avatar: studentData.photo || '/default-avatar.png',
                        photoUrl: studentData.photo,
                        birthDate: studentData.birthDate ? new Date(studentData.birthDate).toISOString().split('T')[0] : '',
                        phone: studentData.phone || '',
                        address: studentData.address || '',
                        aboutMe: `Étudiant en ${studentData.schoolLevel || 'niveau inconnu'}`,

                        // Parent Information
                        parentName: studentData.parentName,
                        parentPhone: studentData.parentPhone,
                        parentRelation: studentData.parentRelation,

                        // Calculate real stats from data
                        coursesCount: studentData.subjects ? Object.keys(studentData.subjects).length : 0,
                        paymentStatus: calculatePaymentStatus(studentData.payments || []),
                        absencesCount: studentData.attendances ? studentData.attendances.filter((a: any) => !a.present).length : 0,
                        stats: {
                            attendance: calculateAttendanceRate(studentData.attendances || []),
                            avgGrade: 75, // This would need grade data from the system
                        },

                        // Default soft skills - could be enhanced with real data
                        softSkills: {
                            problemSolving: 80,
                            discipline: 75,
                            creativity: 85,
                            criticalThinking: 70,
                            collaboration: 80,
                        },

                        // Transform subjects data
                        supportSubjects: transformSubjectsToSupportSubjects(studentData.subjects || {}),

                        // Learning hours - calculate from attendance records
                        learningHours: {
                            total: calculateTotalHoursFromAttendance(studentData.attendances || []),
                            weeklyTarget: 20,
                            thisWeek: calculateWeeklyHoursFromAttendance(studentData.attendances || []),
                        },

                        // Ongoing courses - transform from subjects
                        ongoingCourses: transformSubjectsToCourses(studentData.subjects || {}),

                        // Teacher history - would need real teacher assignment data
                        teacherHistory: [],

                        // Rewards - would need real reward system
                        rewards: [],

                        // Class wall - default data
                        classWall: {
                            teacherName: 'Professeur Principal',
                            teacherAvatar: '/default-teacher.png',
                            teacherRole: 'Enseignant',
                        },

                        // Notifications - would need real notification system
                        notifications: [],

                        // Transform attendances to absences
                        absences: transformAttendancesToAbsences(studentData.attendances || []),

                        // Schedule - would need real schedule data
                        schedule: [],
                    };
                    setStudent(transformedStudent);
                } else {
                    setError('Failed to load student data');
                }
            } catch (err: any) {
                console.error('Error fetching student:', err);
                setError(err.response?.data?.message || 'Failed to load student data');
            } finally {
                setLoading(false);
            }
        };

        if (studentId) {
            fetchStudent();
        }
    }, [studentId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement des données de l'étudiant...</p>
                </div>
            </div>
        );
    }

    if (error || !student) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
                    <p className="text-gray-600">{error || 'Étudiant non trouvé'}</p>
                </div>
            </div>
        );
    }

    return <StudentPageClient student={student} />;
}
