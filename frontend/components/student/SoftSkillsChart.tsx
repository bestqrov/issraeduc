import { StudentData } from '@/lib/mockData';

interface SoftSkillsChartProps {
    student: StudentData;
}

export default function SoftSkillsChart({ student }: SoftSkillsChartProps) {
    const skills = [
        { name: 'Résolution de Problèmes', value: student.softSkills.problemSolving, short: 'Problèmes' },
        { name: 'Discipline', value: student.softSkills.discipline, short: 'Discipline' },
        { name: 'Créativité', value: student.softSkills.creativity, short: 'Créativité' },
        { name: 'Pensée Critique', value: student.softSkills.criticalThinking, short: 'Critique' },
        { name: 'Collaboration', value: student.softSkills.collaboration, short: 'Collaboration' },
    ];

    // Calculate pentagon points for radar chart
    const centerX = 100;
    const centerY = 100;
    const maxRadius = 80;
    const numPoints = skills.length;

    const getPoint = (index: number, value: number) => {
        const angle = (Math.PI * 2 * index) / numPoints - Math.PI / 2;
        const radius = (value / 100) * maxRadius;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return { x, y };
    };

    const getLabelPoint = (index: number) => {
        const angle = (Math.PI * 2 * index) / numPoints - Math.PI / 2;
        const radius = maxRadius + 25;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return { x, y };
    };

    // Create polygon path
    const dataPoints = skills.map((skill, i) => getPoint(i, skill.value));
    const pathData = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

    // Create background grid
    const gridLevels = [20, 40, 60, 80, 100];
    const gridPaths = gridLevels.map(level => {
        const points = Array.from({ length: numPoints }, (_, i) => getPoint(i, level));
        return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
    });

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Compétences générales</h3>
            <p className="text-sm text-gray-500 mb-6">Basé sur les évaluations des enseignants</p>

            <div className="flex justify-center">
                <svg width="250" height="250" viewBox="0 0 200 200" className="overflow-visible">
                    {/* Background grid */}
                    {gridPaths.map((path, i) => (
                        <path
                            key={i}
                            d={path}
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Grid lines from center */}
                    {skills.map((_, i) => {
                        const point = getPoint(i, 100);
                        return (
                            <line
                                key={i}
                                x1={centerX}
                                y1={centerY}
                                x2={point.x}
                                y2={point.y}
                                stroke="#e5e7eb"
                                strokeWidth="1"
                            />
                        );
                    })}

                    {/* Data polygon */}
                    <path
                        d={pathData}
                        fill="url(#skillGradient)"
                        fillOpacity="0.5"
                        stroke="#6366f1"
                        strokeWidth="2"
                    />

                    {/* Data points */}
                    {dataPoints.map((point, i) => (
                        <circle
                            key={i}
                            cx={point.x}
                            cy={point.y}
                            r="4"
                            fill="#6366f1"
                        />
                    ))}

                    {/* Labels */}
                    {skills.map((skill, i) => {
                        const labelPos = getLabelPoint(i);
                        return (
                            <text
                                key={i}
                                x={labelPos.x}
                                y={labelPos.y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-xs fill-gray-600 font-medium"
                                style={{ fontSize: '10px' }}
                            >
                                {skill.short.split('\n').map((line, lineIndex) => (
                                    <tspan key={lineIndex} x={labelPos.x} dy={lineIndex === 0 ? 0 : 12}>
                                        {line}
                                    </tspan>
                                ))}
                            </text>
                        );
                    })}

                    {/* Gradient definition */}
                    <defs>
                        <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#818cf8" />
                            <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
}
