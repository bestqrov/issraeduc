'use client';

import { TeacherData, ScheduleDay } from '@/lib/mockData';
import { Clock, MapPin, User, Calendar } from 'lucide-react';

interface TeacherScheduleProps {
    teacher: TeacherData;
}

export default function TeacherSchedule({ teacher }: TeacherScheduleProps) {
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {days.map((dayName) => {
                    const daySchedule = teacher.schedule.find(s => s.day === dayName);

                    return (
                        <div key={dayName} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-slate-100 text-slate-500">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800">{dayName}</h3>
                            </div>

                            <div className="space-y-4 flex-1">
                                {daySchedule && daySchedule.slots.length > 0 ? (
                                    daySchedule.slots.map((slot, idx) => (
                                        <div key={idx} className="group relative p-4 rounded-xl border border-slate-50 bg-slate-50/50 hover:bg-white hover:border-orange-200 hover:shadow-md transition-all">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm text-xs font-bold text-orange-600 whitespace-nowrap">
                                                        {slot.time}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-800 group-hover:text-orange-600 transition-colors uppercase tracking-tight text-sm">
                                                            {slot.subject}
                                                        </h4>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                                                    {slot.room && (
                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                            <span>{slot.room}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-100 rounded-2xl">
                                        <p className="text-slate-400 font-medium text-sm italic">Aucun cours programmé</p>
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
