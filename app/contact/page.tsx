import Section from "@/components/Section";

const CONTACT = {
  email: "your.name@email.com",     // ← 改成你的邮箱
  phone: "+1 (000) 000-0000",       // ← 可留空或删除 tel 卡片
  github: "https://github.com/yourname",
  linkedin: "https://www.linkedin.com/in/your-handle",
  resume: "/resume.pdf",            // 放到 public/ 里的文件
};

export const metadata = {
  title: "Contact — 宝贝的个人网站",
  description: "Get in touch",
};

function Card({
  title, desc, href
}: { title: string; desc: string; href: string }) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="block rounded-xl border border-gray-200/70 bg-white/80 backdrop-blur p-5 hover:shadow-md transition"
    >
      <div className="text-base font-semibold">{title}</div>
      <div className="text-gray-600 text-sm mt-1">{desc}</div>
    </a>
  );
}

export default function ContactPage() {
  return (
    <Section title="Contact">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card title="Email"    desc={CONTACT.email}    href={`mailto:${CONTACT.email}`} />
        <Card title="Phone"    desc={CONTACT.phone}    href={`tel:${CONTACT.phone.replace(/[^\d+]/g,"")}`} />
        <Card title="GitHub"   desc="View my repositories" href={CONTACT.github} />
        <Card title="LinkedIn" desc="Connect with me"      href={CONTACT.linkedin} />
        <Card title="Resume"   desc="Download my latest PDF" href={CONTACT.resume} />
      </div>
    </Section>
  );
}
