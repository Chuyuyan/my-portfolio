// app/experience/page.tsx
import Section from "@/components/Section";
import ExperienceItem from "@/components/ExperienceItem";
import { experience } from "@/data/experience";

// Metadata configuration for the experience page
export const metadata = {
  title: "Experience — 宝贝的个人网站",
  description: "Internships and work experience",
};
export default function ExperiencePage() {
  return (
    // Main section wrapper for the experience page
    <Section title="Experience">
      {/* Container for experience items with vertical spacing */}
      <div className="space-y-6">
        {/* Map through experience data and render each item */}
        {experience.map((e) => (
          // Experience item component with unique key for React rendering
          <ExperienceItem key={`${e.company}-${e.time}`} item={e} />
        ))}
      </div>
    </Section>
  );
}
  