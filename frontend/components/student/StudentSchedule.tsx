'use client';

import React from 'react';
import { StudentData } from '@/lib/mockData';
import { Calendar, Clock, MapPin, User as UserIcon } from 'lucide-react';

interface StudentScheduleProps {
    student: StudentData;
}

export default function StudentSchedule({ student }: StudentScheduleProps) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Emploi du Temps</h1>
                    <p className="text-gray-500 text-sm">Votre planning hebdomadaire des cours</p>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Télécharger PDF
                </button>
            </div>

            {/* Schedule Multi-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map((dayName) => {
                    const dayData = student.schedule.find(s => s.day === dayName);

                    return (
                        <div key={dayName} className="flex flex-col gap-4">
                            <div className="bg-slate-800 text-white p-3 rounded-xl text-center font-bold text-sm tracking-wide">
                                {dayName}
                            </div>

                            <div className="space-y-4 flex-1">
                                {dayData && dayData.slots.length > 0 ? (
                                    dayData.slots.map((slot, idx) => (
                                        <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 border-l-4 border-l-orange-500 hover:shadow-md transition-shadow">
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-orange-600 uppercase mb-2">
                                                <Clock className="w-3 h-3" />
                                                {slot.time}
                                            </div>
                                            <h4 className="text-sm font-bold text-gray-800 mb-2 leading-tight">{slot.subject}</h4>

                                            <div className="space-y-1.5">
                                                {slot.room && (
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <MapPin className="w-3 h-3" />
                                                        <span>{slot.room}</span>
                                                    </div>
                                                )}
                                                {slot.teacher && (
                                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                                        <UserIcon className="w-3 h-3" />
                                                        <span>{slot.teacher}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 p-8 flex flex-col items-center justify-center text-center">
                                        <p className="text-xs text-gray-400 italic">Aucun cours</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
