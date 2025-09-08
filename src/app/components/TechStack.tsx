import Link from 'next/link';

type ProjectTechStackProps = {
    techStack: {
        name: string;
        link: string;
        color: string;
    }[];
};

export default function ProjectTechStack({ techStack }: ProjectTechStackProps) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2 mx-auto">
            <div className="self-center font-semibold uppercase text-sm tracking-tight">Tech Stack:</div>
            <div className="flex flex-wrap align-center justify-center gap-2">
                {techStack.map((tech, index) => (
                    <Link key={index} href={tech.link} target="_blank" className={`${tech.color} flex items-center justify-center font-semibold text-xs rounded-sm px-1.5`}>
                        {tech.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
