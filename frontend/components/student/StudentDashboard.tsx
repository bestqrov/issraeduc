import { StudentData } from '@/lib/mockData';
import SoftSkillsChart from './SoftSkillsChart';
import InterestFieldsChart from './InterestFieldsChart';
import LearningHoursCard from './LearningHoursCard';
import OngoingCoursesCard from './OngoingCoursesCard';

interface StudentDashboardProps {
  student: StudentData;
}

export default function StudentDashboard({ student }: StudentDashboardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="space-y-6">
        <SoftSkillsChart student={student} />
        <LearningHoursCard student={student} />
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <InterestFieldsChart student={student} />
        <OngoingCoursesCard student={student} />
      </div>
    </div>
  );
}
