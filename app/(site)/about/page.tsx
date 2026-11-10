import { ExperienceVisual, MissionVisual, StoryVisual } from "@/components/about-visuals";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageCta } from "@/components/page-cta";
import { Reveal } from "@/components/reveal";
import { aboutPage } from "@/config/about";
import { features, stats } from "@/config/content";
import { teamMembers, teamPlaceholders } from "@/config/team";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "درباره متاتست",
  description: aboutPage.lede,
  path: "/about",
});

const slots = teamMembers.length > 0 ? teamMembers : Array.from({ length: teamPlaceholders }, (_, index) => ({
  id: `slot-${index}`,
  name: "",
  role: "",
  portrait: null as string | null,
}));

export default function AboutPage() {
  return (
    <>
      <section className="cinema-hero">
        <div>
          <Breadcrumbs
            items={[
              { name: "خانه", path: "/" },
              { name: "درباره متاتست", path: "/about" },
            ]}
          />
          <h1 className="page-title shine-title">{aboutPage.title}</h1>
          <p className="page-lede">{aboutPage.lede}</p>
        </div>
        <StoryVisual />
      </section>

      <section className="cinema-copy" aria-labelledby="story-title">
        <Reveal>
          <h2 id="story-title" className="section-heading">
            داستان محصول
          </h2>
          {aboutPage.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
      </section>

      <section className="cinema-split is-flip" aria-labelledby="mission-title">
        <Reveal>
          <MissionVisual />
        </Reveal>
        <Reveal delay={70}>
          <h2 id="mission-title" className="section-heading">
            {aboutPage.missionTitle}
          </h2>
          {aboutPage.mission.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
      </section>

      <section className="cinema-copy" aria-labelledby="problems-title">
        <Reveal>
          <h2 id="problems-title" className="section-heading">
            {aboutPage.problemsTitle}
          </h2>
        </Reveal>
        <div className="problem-list">
          {aboutPage.problems.map((problem, index) => (
            <Reveal key={problem.title} delay={index * 60}>
              <article>
                <h3>{problem.title}</h3>
                <p>{problem.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cinema-experience" aria-labelledby="experience-title">
        <Reveal>
          <h2 id="experience-title" className="section-heading">
            {aboutPage.capabilityTitle}
          </h2>
          <ExperienceVisual />
        </Reveal>
        <div className="experience-list">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 70}>
              <article>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cinema-team" aria-labelledby="team-title">
        <Reveal>
          <h2 id="team-title" className="section-heading">
            تیم
          </h2>
          <p className="page-lede">نام، نقش و پرتره اعضا هنوز در این پروژه ثبت نشده است.</p>
        </Reveal>
        <div className="team-grid">
          {slots.map((member, index) => (
            <Reveal key={member.id} delay={index * 60}>
              <article className="team-card">
                {member.portrait ? (
                  <img src={member.portrait} alt={member.name || "پرتره عضو تیم"} />
                ) : (
                  <div className="portrait-slot" role="img" aria-label="جای پرتره">
                    پرتره
                  </div>
                )}
                <h3>{member.name || "در انتظار نام"}</h3>
                <p>{member.role || "در انتظار نقش"}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="quiet-figures" aria-labelledby="about-stats-title">
        <h2 id="about-stats-title" className="section-heading">
          رقم‌هایی که در صفحه اصلی آمده است
        </h2>
        <ul>
          {stats.map((stat) => (
            <li key={stat.label}>
              <strong>
                {stat.target.toLocaleString("fa-IR")}
                {stat.suffix}
              </strong>
              <span>{stat.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <PageCta title={aboutPage.closeTitle} text={aboutPage.closeText} />
    </>
  );
}
