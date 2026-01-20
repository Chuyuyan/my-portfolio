import Section from "@/components/Section";
import Card from "@/components/ui/Card";

const CONTACT = {
  email: "c29yan@uwaterloo.ca",     
  phone: "+1 (647) 802-4523",       // ← 可留空或删除 tel 卡片
  github: "https://github.com/Chuyuyan",
  linkedin: "https://www.linkedin.com/in/chuyu-yan-611a32365/",
};

export const metadata = {
  title: "Contact — 宝贝的个人网站",
  description: "Get in touch",
};

function ContactCard({
  title, desc, href
}: { title: string; desc: string; href: string }) {
  const isExternal = href.startsWith("http");
  const isResume = href.includes("resume") && href.endsWith(".pdf");
  return (
    <a
      href={href}
      download={isResume ? "Chuyu-Yan-resume-2026-1-6.pdf" : undefined}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="block"
    >
      <Card hover className="group cursor-pointer">
        <div className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors relative inline-block mb-2">
          <span className="relative">
            {title}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-out" />
          </span>
        </div>
        <div className="text-slate-600 text-sm mt-1">{desc}</div>
      </Card>
    </a>
  );
}

export default function ContactPage() {
  return (
    <Section title="Contact">
      <div className="grid gap-4 sm:grid-cols-2">
        <ContactCard title="Email"    desc={CONTACT.email}    href={`mailto:${CONTACT.email}`} />
        <ContactCard title="Phone"    desc={CONTACT.phone}    href={`tel:${CONTACT.phone.replace(/[^\d+]/g,"")}`} />
        <ContactCard title="GitHub"   desc="View my repositories" href={CONTACT.github} />
        <ContactCard title="LinkedIn" desc="Connect with me"      href={CONTACT.linkedin} />
      </div>
    </Section>
  ); 
     // TODO: add error handling
     
}
