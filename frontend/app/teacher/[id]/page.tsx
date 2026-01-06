import { notFound } from 'next/navigation';
import { getTeacherById } from '@/lib/mockData';
import TeacherPageClient from '@/components/teacher/TeacherPageClient';

export default async function TeacherPage({ params }: { params: { id: string } }) {
    const teacher = getTeacherById(params.id);

    if (!teacher) {
        notFound();
    }

    return <TeacherPageClient teacher={teacher} />;
}

// Generate static params for mock data
export async function generateStaticParams() {
    return [
        { id: '1' },
        { id: '2' },
    ];
}
