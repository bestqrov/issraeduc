'use client';

import { TeacherData } from '@/lib/mockData';
import { BookOpen, GraduationCap, Users } from 'lucide-react';

interface TeacherCoursesProps {
    teacher: TeacherData;
}

export default function TeacherCourses({ teacher }: TeacherCoursesProps) {
    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {teacher.courses.map((course) => (
                    <div key={course.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all group">
                        <div className={`w-12 h-12 rounded-xl ${course.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{course.name}</h3>
                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                            <Users className="w-4 h-4" />
                            <span>{course.studentCount} Étudiants</span>
                        </div>

                        <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Contenu du cours</span>
                            <button className="text-blue-500 font-bold text-sm hover:underline flex items-center gap-1">
                                Consulter <GraduationCap className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
