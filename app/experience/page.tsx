// app/experience/page.tsx
import Section from "@/components/Section";
import ExperienceItem from "@/components/ExperienceItem";
import { experience } from "@/data/experience";

export const metadata = {
  title: "Experience — 宝贝的个人网站",
  description: "Internships and work experience",
};

export default function ExperiencePage() {
  return (
    <Section title="Experience">
      <div className="space-y-6">
        {experience.map((e) => (
          <ExperienceItem key={`${e.company}-${e.time}`} item={e} />
        ))}
      </div>
    </Section>
  );
}
