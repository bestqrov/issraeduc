// Enhanced Mock data for Student and Parent templates

// ============= INTERFACES =============

export interface SoftSkills {
    problemSolving: number; // 0-100
    discipline: number;
    creativity: number;
    criticalThinking: number;
    collaboration: number;
}

export interface SupportSubject {
    name: string;
    value: number; // 0-100
    color: string;
}

export interface LearningHours {
    total: number;
    weeklyTarget: number;
    thisWeek: number;
}

export interface OngoingCourse {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    progress: number; // 0-100
    color: string;
}

export interface Teacher {
    id: string;
    name: string;
    avatar: string;
    subject: string;
}

export interface Reward {
    id: string;
    name: string;
    icon: string;
    earned: boolean;
    earnedDate?: string;
}

export interface ClassWall {
    teacherName: string;
    teacherAvatar: string;
    teacherRole: string;
}

export interface StudentData {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar: string;
    photoUrl?: string;
    birthDate: string;
    phone: string;
    address: string;
    aboutMe: string;

    // Parent Information
    parentName?: string;
    parentPhone?: string;
    parentRelation?: string;

    // Stats
    coursesCount: number;
    paymentStatus: 'paid' | 'pending' | 'overdue';
    absencesCount: number;
    stats: {
        attendance: number;
        avgGrade: number;
    };

    // Enhanced data
    softSkills: SoftSkills;
    supportSubjects: SupportSubject[];
    learningHours: LearningHours;
    ongoingCourses: OngoingCourse[];
    teacherHistory: Teacher[];
    rewards: Reward[];
    classWall: ClassWall;
    notifications: Notification[];
    absences: ChildAbsence[]; // Reuse ChildAbsence interface
    schedule: ScheduleDay[];
}

export interface ScheduleDay {
    day: string;
    slots: TimeSlot[];
}

export interface TimeSlot {
    time: string;
    subject: string;
    room?: string;
    teacher?: string;
}

export interface ParentData {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    children: ChildData[];
    notifications: Notification[];
    payments: ParentPayment[];
}

export interface ChildData {
    id: string;
    name: string;
    paymentStatus: 'paid' | 'pending' | 'overdue';
    absencesCount: number;
    schoolLevel: string;
    subjects: { name: string; price: number }[];
    status: 'Actif' | 'Inactif';
    absences: ChildAbsence[];
}

export interface ChildAbsence {
    id: string;
    date: string;
    reason: string;
    status: 'Justifié' | 'Non Justifié';
}

export interface ParentPayment {
    id: string;
    date: string;
    amount: number;
    month: string;
    method: 'Espèces' | 'Virement' | 'Chèque';
    status: 'Payé' | 'En attente' | 'En retard';
    subjects: string[];
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    date: string;
    read: boolean;
    type?: 'payment' | 'academic' | 'admin' | 'urgent' | 'general';
}

export interface TeacherData {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    aboutMe: string;
    specialization: string;
    experience: string;

    // Stats
    totalStudents: number;
    activeGroups: number;
    hoursThisWeek: number;

    groups: TeacherGroup[];
    courses: TeacherCourse[];
    notifications: Notification[];
    schedule: ScheduleDay[];
}

export interface TeacherGroup {
    id: string;
    name: string;
    studentCount: number;
    level: string;
    nextClass: string;
}

export interface TeacherCourse {
    id: string;
    name: string;
    studentCount: number;
    color: string;
}

// ============= MOCK STUDENTS DATA =============

export const studentsData: Record<string, StudentData> = {
    '1': {
        id: '1',
        name: 'Ahmed Benali',
        username: '@ahmedben',
        email: 'ahmed.benali@example.com',
        avatar: 'AB',
        birthDate: '2004-12-28',
        phone: '+212 6 11 22 33 44',
        address: 'Quartier Gauthier, Rue de la Liberté, Casablanca',
        aboutMe: 'Passionné par les technologies innovantes et le design. Je m\'implique activement dans mes études pour devenir ingénieur. J\'aime aussi la photographie urbaine et jouer de la guitare acoustique pendant mon temps libre.',

        coursesCount: 5,
        paymentStatus: 'paid',
        absencesCount: 2,
        stats: {
            attendance: 95,
            avgGrade: 17.5,
        },

        softSkills: {
            problemSolving: 85,
            discipline: 75,
            creativity: 90,
            criticalThinking: 80,
            collaboration: 70,
        },

        supportSubjects: [
            { name: 'Mathématiques', value: 85, color: 'bg-orange-500' },
            { name: 'Physique', value: 70, color: 'bg-blue-500' },
            { name: 'Français', value: 90, color: 'bg-purple-500' },
        ],

        learningHours: {
            total: 180,
            weeklyTarget: 40,
            thisWeek: 32,
        },

        ongoingCourses: [
            {
                id: 'c1',
                name: 'Mathématiques',
                startDate: '2025-09-01',
                endDate: '2026-06-30',
                progress: 75,
                color: 'orange',
            },
            {
                id: 'c2',
                name: 'Sciences Physiques',
                startDate: '2025-09-01',
                endDate: '2026-06-30',
                progress: 60,
                color: 'blue',
            },
            {
                id: 'c3',
                name: 'Langue Française',
                startDate: '2025-09-01',
                endDate: '2026-06-30',
                progress: 90,
                color: 'purple',
            },
        ],

        teacherHistory: [
            { id: 't1', name: 'Ridwan R', avatar: 'RR', subject: 'Mathematics' },
            { id: 't2', name: 'Diana L', avatar: 'DL', subject: 'English' },
            { id: 't3', name: 'Bastian V', avatar: 'BV', subject: 'Japanese' },
            { id: 't4', name: 'Ismail R', avatar: 'IR', subject: 'Physics' },
        ],

        rewards: [
            { id: 'r1', name: 'Perfect Attendance', icon: '🎯', earned: true, earnedDate: '2025-12-01' },
            { id: 'r2', name: 'Top Student', icon: '🏆', earned: true, earnedDate: '2025-11-15' },
            { id: 'r3', name: 'Team Player', icon: '🤝', earned: false },
            { id: 'r4', name: 'Creative Mind', icon: '💡', earned: true, earnedDate: '2025-10-20' },
            { id: 'r5', name: 'Fast Learner', icon: '⚡', earned: false },
            { id: 'r6', name: 'Problem Solver', icon: '🧩', earned: true, earnedDate: '2025-12-10' },
        ],

        classWall: {
            teacherName: 'Ny. Adriana Ramha',
            teacherAvatar: 'AR',
            teacherRole: '@ramhaadri',
        },

        notifications: [
            {
                id: 'n1',
                title: 'New Assignment',
                message: 'Math homework due next Monday',
                date: '2025-12-20',
                read: false,
            },
            {
                id: 'n2',
                title: 'Payment Confirmed',
                message: 'Your payment for December has been received',
                date: '2025-12-18',
                read: true,
            },
        ],
        absences: [
            { id: 'sa1', date: '2025-12-10', reason: 'Grippe légère', status: 'Justifié' },
            { id: 'sa2', date: '2025-11-20', reason: 'Rendez-vous dentaire', status: 'Justifié' }
        ],
        schedule: [
            {
                day: 'Lundi',
                slots: [
                    { time: '08:30 - 10:00', subject: 'Mathématiques', room: 'Salar 1', teacher: 'Pr. Alami' },
                    { time: '10:15 - 11:45', subject: 'Physique', room: 'Laboratoire', teacher: 'Pr. Benali' },
                ]
            },
            {
                day: 'Mardi',
                slots: [
                    { time: '09:00 - 10:30', subject: 'Français', room: 'Salle 4', teacher: 'Mme. Fassi' },
                    { time: '14:00 - 15:30', subject: 'Anglais', room: 'Salle 2', teacher: 'Mr. Smith' },
                ]
            },
            {
                day: 'Mercredi',
                slots: [
                    { time: '08:30 - 12:00', subject: 'Informatique', room: 'Salle Informatique', teacher: 'Pr. Idrissi' },
                ]
            }
        ]
    },

    '2': {
        id: '2',
        name: 'Fatima Zahra',
        username: '@fatimazahra',
        email: 'fatima.zahra@example.com',
        avatar: 'FZ',
        birthDate: '2005-05-15',
        phone: '+212 6 22 33 44 55',
        address: 'Résidence Al Mansour, Hay Riad, Rabat',
        aboutMe: 'Passionnée par l\'informatique et le développement web. J\'aime relever des défis techniques et apprendre de nouvelles compétences en programmation. Mon objectif est d\'exceller dans le domaine de la Data Science.',

        coursesCount: 6,
        paymentStatus: 'pending',
        absencesCount: 0,
        stats: {
            attendance: 100,
            avgGrade: 14.8,
        },

        softSkills: {
            problemSolving: 95,
            discipline: 90,
            creativity: 85,
            criticalThinking: 92,
            collaboration: 88,
        },

        supportSubjects: [
            { name: 'Informatique', value: 95, color: 'bg-emerald-500' },
            { name: 'Anglais', value: 80, color: 'bg-blue-500' },
            { name: 'Arabe', value: 75, color: 'bg-red-500' },
        ],

        learningHours: {
            total: 220,
            weeklyTarget: 40,
            thisWeek: 38,
        },

        ongoingCourses: [
            {
                id: 'c4',
                name: 'Programmation Avancée',
                startDate: '2025-09-01',
                endDate: '2026-06-30',
                progress: 85,
                color: 'green',
            },
            {
                id: 'c5',
                name: 'Développement Web',
                startDate: '2025-09-01',
                endDate: '2026-06-30',
                progress: 70,
                color: 'blue',
            },
            {
                id: 'c6',
                name: 'Data Science',
                startDate: '2025-09-01',
                endDate: '2026-06-30',
                progress: 95,
                color: 'purple',
            },
        ],

        teacherHistory: [
            { id: 't5', name: 'Sarah M', avatar: 'SM', subject: 'Programming' },
            { id: 't6', name: 'Karim B', avatar: 'KB', subject: 'Web Dev' },
            { id: 't7', name: 'Laila H', avatar: 'LH', subject: 'Data Science' },
        ],

        rewards: [
            { id: 'r7', name: 'Perfect Attendance', icon: '🎯', earned: true, earnedDate: '2025-12-01' },
            { id: 'r8', name: 'Top Student', icon: '🏆', earned: true, earnedDate: '2025-11-01' },
            { id: 'r9', name: 'Team Player', icon: '🤝', earned: true, earnedDate: '2025-10-15' },
            { id: 'r10', name: 'Creative Mind', icon: '💡', earned: true, earnedDate: '2025-09-20' },
            { id: 'r11', name: 'Fast Learner', icon: '⚡', earned: true, earnedDate: '2025-11-25' },
            { id: 'r12', name: 'Problem Solver', icon: '🧩', earned: true, earnedDate: '2025-12-15' },
        ],

        classWall: {
            teacherName: 'Mr. Hassan Idrissi',
            teacherAvatar: 'HI',
            teacherRole: '@hassanidrissi',
        },

        notifications: [
            {
                id: 'n3',
                title: 'Payment Reminder',
                message: 'Monthly payment is due in 3 days',
                date: '2025-12-22',
                read: false,
            },
            {
                id: 'n4',
                title: 'Exam Schedule',
                message: 'Final exams start on January 15th',
                date: '2025-12-19',
                read: false,
            },
        ],
        absences: [],
        schedule: [
            {
                day: 'Lundi',
                slots: [
                    { time: '09:00 - 10:30', subject: 'Arabe', room: 'Salle 1', teacher: 'Mme. Zahra' },
                ]
            },
            {
                day: 'Mercredi',
                slots: [
                    { time: '10:00 - 11:30', subject: 'Eveil Scientifique', room: 'Salle 3', teacher: 'Mme. Imane' },
                ]
            }
        ]
    },

    '3': {
        id: '3',
        name: 'Youssef Alami',
        username: '@youssefalam',
        email: 'youssef.alami@example.com',
        avatar: 'YA',
        birthDate: '2006-08-10',
        phone: '+212 6 33 44 55 66',
        address: 'Villa 14, Quartier Malabata, Tanger',
        aboutMe: 'Sportif et dynamique, je pratique le football et le basket-ball. Je m\'intéresse également au design graphique et à l\'art numérique. Je cherche toujours à équilibrer mes performances académiques avec mes passions.',

        coursesCount: 4,
        paymentStatus: 'overdue',
        absencesCount: 5,
        stats: {
            attendance: 82,
            avgGrade: 12.4,
        },

        softSkills: {
            problemSolving: 65,
            discipline: 55,
            creativity: 75,
            criticalThinking: 60,
            collaboration: 80,
        },

        supportSubjects: [
            { name: 'Philosophie', value: 65, color: 'bg-indigo-500' },
            { name: 'SVT', value: 85, color: 'bg-green-500' },
            { name: 'Histoire-Géo', value: 70, color: 'bg-amber-500' },
        ],

        learningHours: {
            total: 120,
            weeklyTarget: 40,
            thisWeek: 18,
        },

        ongoingCourses: [
            {
                id: 'c7',
                name: 'Design Graphique',
                startDate: '2025-09-01',
                endDate: '2026-06-30',
                progress: 45,
                color: 'pink',
            },
            {
                id: 'c8',
                name: 'Marketing Digital',
                startDate: '2025-09-01',
                endDate: '2026-06-30',
                progress: 30,
                color: 'orange',
            },
        ],

        teacherHistory: [
            { id: 't8', name: 'Omar K', avatar: 'OK', subject: 'Design' },
            { id: 't9', name: 'Amina S', avatar: 'AS', subject: 'Sports' },
        ],

        rewards: [
            { id: 'r13', name: 'Perfect Attendance', icon: '🎯', earned: false },
            { id: 'r14', name: 'Top Student', icon: '🏆', earned: false },
            { id: 'r15', name: 'Team Player', icon: '🤝', earned: true, earnedDate: '2025-11-10' },
            { id: 'r16', name: 'Creative Mind', icon: '💡', earned: true, earnedDate: '2025-10-05' },
            { id: 'r17', name: 'Fast Learner', icon: '⚡', earned: false },
            { id: 'r18', name: 'Problem Solver', icon: '🧩', earned: false },
        ],

        classWall: {
            teacherName: 'Ms. Nadia Benjelloun',
            teacherAvatar: 'NB',
            teacherRole: '@nadiabenjelloun',
        },

        notifications: [
            {
                id: 'n5',
                title: 'Payment Overdue',
                message: 'Please contact administration regarding overdue payment',
                date: '2025-12-23',
                read: false,
            },
            {
                id: 'n6',
                title: 'Absence Warning',
                message: 'You have exceeded the allowed absence limit',
                date: '2025-12-21',
                read: false,
            },
        ],
        absences: [
            { id: 'sa3', date: '2025-12-05', reason: 'Retard transport', status: 'Non Justifié' },
            { id: 'sa4', date: '2025-12-06', reason: 'Voyage familial', status: 'Non Justifié' }
        ],
        schedule: [
            {
                day: 'Jeudi',
                slots: [
                    { time: '15:00 - 17:00', subject: 'Philosophie', room: 'Salle 12', teacher: 'Pr. Bensaid' },
                ]
            },
            {
                day: 'Vendredi',
                slots: [
                    { time: '08:30 - 10:30', subject: 'SVT', room: 'Laboratoire 2', teacher: 'Mme. Hakimi' },
                ]
            }
        ]
    },
};

// ============= MOCK PARENTS DATA =============

export const parentsData: Record<string, ParentData> = {
    '1': {
        id: '1',
        name: 'Mohammed Benali',
        email: 'mohammed.benali@example.com',
        phone: '+212 6 12 34 56 78',
        avatar: 'MB',
        children: [
            {
                id: 'c1',
                name: 'Ahmed Benali',
                paymentStatus: 'paid',
                absencesCount: 2,
                schoolLevel: 'LYCEE',
                status: 'Actif',
                subjects: [
                    { name: 'Mathématiques', price: 400 },
                    { name: 'Physique', price: 350 }
                ],
                absences: [
                    { id: 'a1', date: '2025-12-10', reason: 'Rendez-vous médical', status: 'Justifié' },
                    { id: 'a2', date: '2025-11-15', reason: 'Grippe', status: 'Justifié' }
                ]
            },
            {
                id: 'c2',
                name: 'Sara Benali',
                paymentStatus: 'paid',
                absencesCount: 1,
                schoolLevel: 'COLLEGE',
                status: 'Actif',
                subjects: [
                    { name: 'Français', price: 300 },
                    { name: 'Anglais', price: 300 }
                ],
                absences: [
                    { id: 'a3', date: '2025-12-05', reason: 'Retard transport', status: 'Non Justifié' }
                ]
            },
        ],
        payments: [
            {
                id: 'p1',
                date: '2025-12-01',
                amount: 1350,
                month: 'Décembre 2025',
                method: 'Virement',
                status: 'Payé',
                subjects: ['Maths', 'Physique', 'Français', 'Anglais']
            },
            {
                id: 'p2',
                date: '2025-11-02',
                amount: 1350,
                month: 'Novembre 2025',
                method: 'Espèces',
                status: 'Payé',
                subjects: ['Maths', 'Physique', 'Français', 'Anglais']
            }
        ],
        notifications: [
            {
                id: 'pn1',
                title: 'Paiement Confirmé',
                message: 'Le paiement pour les deux enfants a été reçu',
                date: '2025-12-18',
                read: true,
                type: 'payment'
            },
            {
                id: 'pn2',
                title: 'Réunion Parents-Professeurs',
                message: 'Prévue pour le 28 décembre à 10h00',
                date: '2025-12-20',
                read: false,
                type: 'academic'
            },
        ],
    },
    '2': {
        id: '2',
        name: 'Amina El Fassi',
        email: 'amina.elfassi@example.com',
        phone: '+212 6 98 76 54 32',
        avatar: 'AE',
        children: [
            {
                id: 'c3',
                name: 'Fatima Zahra El Fassi',
                paymentStatus: 'pending',
                absencesCount: 0,
                schoolLevel: 'PRIMAIRE',
                status: 'Actif',
                subjects: [
                    { name: 'Arabe', price: 250 },
                    { name: 'Mathématiques', price: 250 }
                ],
                absences: []
            },
        ],
        payments: [
            {
                id: 'p3',
                date: '2025-11-05',
                amount: 500,
                month: 'Novembre 2025',
                method: 'Espèces',
                status: 'Payé',
                subjects: ['Arabe', 'Maths']
            }
        ],
        notifications: [
            {
                id: 'pn3',
                title: 'Rappel de Paiement',
                message: 'Le paiement mensuel est dû dans 3 jours',
                date: '2025-12-22',
                read: false,
                type: 'payment'
            },
            {
                id: 'pn4',
                title: 'Excellente Performance',
                message: 'Fatima Zahra a obtenu les meilleures notes aux derniers examens',
                date: '2025-12-19',
                read: false,
                type: 'academic'
            },
        ],
    },
    '3': {
        id: '3',
        name: 'Hassan Alami',
        email: 'hassan.alami@example.com',
        phone: '+212 6 55 44 33 22',
        avatar: 'HA',
        children: [
            {
                id: 'c4',
                name: 'Youssef Alami',
                paymentStatus: 'overdue',
                absencesCount: 5,
                schoolLevel: 'LYCEE',
                status: 'Actif',
                subjects: [
                    { name: 'Mathématiques', price: 400 },
                    { name: 'Informatique', price: 450 }
                ],
                absences: [
                    { id: 'a4', date: '2025-12-12', reason: 'Voyage familial', status: 'Non Justifié' },
                    { id: 'a5', date: '2025-12-13', reason: 'Voyage familial', status: 'Non Justifié' }
                ]
            },
            {
                id: 'c5',
                name: 'Karim Alami',
                paymentStatus: 'pending',
                absencesCount: 3,
                schoolLevel: 'COLLEGE',
                status: 'Actif',
                subjects: [
                    { name: 'Sciences', price: 300 }
                ],
                absences: [
                    { id: 'a6', date: '2025-12-14', reason: 'Malade', status: 'Justifié' }
                ]
            },
        ],
        payments: [
            {
                id: 'p4',
                date: '2025-10-10',
                amount: 1150,
                month: 'Octobre 2025',
                method: 'Chèque',
                status: 'Payé',
                subjects: ['Maths', 'Info', 'Sciences']
            }
        ],
        notifications: [
            {
                id: 'pn5',
                title: 'Urgent: Paiement Requis',
                message: 'Veuillez contacter l\'administration concernant les paiements en retard',
                date: '2025-12-23',
                read: false,
                type: 'payment'
            },
            {
                id: 'pn6',
                title: 'Limite d\'Absences',
                message: 'Youssef a dépassé la limite d\'absences autorisée',
                date: '2025-12-21',
                read: false,
                type: 'academic'
            },
        ],
    },
}

// ============= HELPER FUNCTIONS =============

export const getStudentById = (id: string): StudentData | null => {
    return studentsData[id] || null;
};

export const getParentById = (id: string): ParentData | null => {
    return parentsData[id] || null;
};

// ============= MOCK TEACHERS DATA =============

export const teachersData: Record<string, TeacherData> = {
    '1': {
        id: '1',
        name: 'Pr. Karim Alami',
        email: 'karim.alami@example.com',
        phone: '+212 6 11 22 33 44',
        avatar: 'KA',
        aboutMe: 'Enseignant passionné de Mathématiques avec plus de 10 ans d\'expérience dans l\'enseignement secondaire. Spécialisé en Analyse et Algèbre.',
        specialization: 'Mathématiques',
        experience: '12 ans',
        totalStudents: 124,
        activeGroups: 5,
        hoursThisWeek: 18,
        groups: [
            { id: 'g1', name: 'Groupe A - 2ème Bac SM', studentCount: 28, level: '2ème Bac SM', nextClass: 'Lundi 08:30' },
            { id: 'g2', name: 'Groupe B - 2ème Bac PC', studentCount: 32, level: '2ème Bac PC', nextClass: 'Mardi 10:15' },
            { id: 'g3', name: 'Groupe C - 1ère Bac PC', studentCount: 24, level: '1ère Bac PC', nextClass: 'Mercredi 14:00' },
        ],
        courses: [
            { id: 'c1', name: 'Analyse Mathématique', studentCount: 60, color: 'bg-orange-500' },
            { id: 'c2', name: 'Algèbre Linéaire', studentCount: 40, color: 'bg-blue-500' },
            { id: 'c3', name: 'Géométrie Vectorielle', studentCount: 24, color: 'bg-purple-500' },
        ],
        notifications: [
            { id: 'tn1', title: 'Réunion Pédagogique', message: 'Réunion de coordination des professeurs de mathématiques ce vendredi à 16h.', date: '2025-12-24', read: false, type: 'admin' },
            { id: 'tn2', title: 'Nouveau Programme', message: 'Le guide du nouveau manuel scolaire est disponible au secrétariat.', date: '2025-12-23', read: true, type: 'general' },
        ],
        schedule: [
            {
                day: 'Lundi',
                slots: [
                    { time: '08:30 - 10:00', subject: 'Mathématiques', room: 'Salle 1', teacher: 'Karim Alami' },
                    { time: '10:15 - 11:45', subject: 'Soutien Scolaire', room: 'Salle 3', teacher: 'Karim Alami' },
                ]
            },
            {
                day: 'Mardi',
                slots: [
                    { time: '10:15 - 11:45', subject: 'Mathématiques', room: 'Salle 4', teacher: 'Karim Alami' },
                ]
            }
        ]
    },
    '2': {
        id: '2',
        name: 'Mme. Nadia Fassi',
        email: 'nadia.fassi@example.com',
        phone: '+212 6 55 66 77 88',
        avatar: 'NF',
        aboutMe: 'Professeure de Français dynamique, adepte des méthodes d\'enseignement interactives et du théâtre scolaire.',
        specialization: 'Langue Française',
        experience: '8 ans',
        totalStudents: 95,
        activeGroups: 4,
        hoursThisWeek: 16,
        groups: [
            { id: 'g4', name: 'Groupe D - 3ème Année Collège', studentCount: 25, level: '3ème Collège', nextClass: 'Lundi 10:15' },
            { id: 'g5', name: 'Groupe E - Tronc Commun', studentCount: 30, level: 'Tronc Commun', nextClass: 'Mercredi 08:30' },
        ],
        courses: [
            { id: 'c4', name: 'Littérature Française', studentCount: 55, color: 'bg-pink-500' },
            { id: 'c5', name: 'Communication Orale', studentCount: 40, color: 'bg-emerald-500' },
        ],
        notifications: [
            { id: 'tn3', title: 'Urgent: Notes Trimestrielles', message: 'Veuillez saisir les notes du 1er trimestre avant la fin de semaine.', date: '2025-12-24', read: false, type: 'urgent' },
        ],
        schedule: [
            {
                day: 'Lundi',
                slots: [
                    { time: '10:15 - 11:45', subject: 'Français', room: 'Salle 2', teacher: 'Nadia Fassi' },
                ]
            },
            {
                day: 'Mercredi',
                slots: [
                    { time: '08:30 - 10:00', subject: 'Français', room: 'Salle 5', teacher: 'Nadia Fassi' },
                ]
            }
        ]
    }
};

export const getTeacherById = (id: string): TeacherData | null => {
    return teachersData[id] || null;
};
