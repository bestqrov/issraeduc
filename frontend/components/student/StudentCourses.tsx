'use client';

import React from 'react';
import { StudentData } from '@/lib/mockData';
import { BookOpen, Clock, User, CheckCircle2, PlayCircle, BarChart3 } from 'lucide-react';

interface StudentCoursesProps {
    student: StudentData;
}

export default function StudentCourses({ student }: StudentCoursesProps) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Mes Cours</h1>
                <div className="flex gap-2">
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                        {student.coursesCount} Cours Actifs
                    </span>
                </div>
            </div>

            {/* Main Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {student.ongoingCourses.map((course) => (
                    <div key={course.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-${course.color}-50 text-${course.color}-600 group-hover:scale-110 transition-transform`}>
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>{course.startDate}</span>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-800 mb-2">{course.name}</h3>

                        {/* Progress Bar */}
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-xs font-medium text-gray-600">
                                <span>Progression</span>
                                <span>{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-${course.color}-500 transition-all duration-500`}
                                    style={{ width: `${course.progress}%` }}
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                                    {student.teacherHistory.find(t => t.subject.includes(course.name.split(' ')[0]))?.avatar || 'TR'}
                                </div>
                                <span className="text-xs text-gray-500 font-medium">
                                    {student.teacherHistory.find(t => t.subject.includes(course.name.split(' ')[0]))?.name || 'Professeur'}
                                </span>
                            </div>
                            <button className="text-orange-500 hover:text-orange-600 transition-colors">
                                <PlayCircle className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Courses Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-slate-800 rounded-2xl p-6 text-white overflow-hidden relative">
                    <BarChart3 className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5" />
                    <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-semibold">Total Heures</p>
                    <h3 className="text-3xl font-bold">{student.learningHours.total}h</h3>
                    <p className="text-slate-500 text-xs mt-2">Ce mois-ci: +{student.learningHours.thisWeek}h</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span className="text-gray-500 text-sm font-medium">Objectif Hebdomadaire</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{student.learningHours.weeklyTarget}h</h3>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3">
                        <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${(student.learningHours.thisWeek / student.learningHours.weeklyTarget) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm mb-1">Moyenne Générale</p>
                        <h3 className="text-2xl font-bold text-gray-800">{student.stats.avgGrade}/20</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-orange-500 flex items-center justify-center text-orange-500 font-bold text-sm">
                        {Math.round((student.stats.avgGrade / 20) * 100)}%
                    </div>
                </div>
            </div>
        </div>
    );
}
