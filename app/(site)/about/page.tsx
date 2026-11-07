import { PageCta } from "@/components/page-cta";
import { PageHero } from "@/components/page-hero";
import { aboutPage } from "@/config/about";
import { features, stats } from "@/config/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "درباره متاتست",
  description: aboutPage.lede,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutPage.eyebrow}
        title={aboutPage.title}
        lede={aboutPage.lede}
        crumbs={[
          { name: "خانه", path: "/" },
          { name: "درباره متاتست", path: "/about" },
        ]}
      />

      <section className="page-section prose">
        {aboutPage.story.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="page-section" aria-labelledby="mission-title">
        <h2 id="mission-title" className="section-heading">
          {aboutPage.missionTitle}
        </h2>
        <div className="prose">
          {aboutPage.mission.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="page-section" aria-labelledby="problems-title">
        <h2 id="problems-title" className="section-heading">
          {aboutPage.problemsTitle}
        </h2>
        <div className="info-grid">
          {aboutPage.problems.map((problem) => (
            <article key={problem.title} className="info-card glass-panel">
              <h3>{problem.title}</h3>
              <p>{problem.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section" aria-labelledby="capability-title">
        <h2 id="capability-title" className="section-heading">
          {aboutPage.capabilityTitle}
        </h2>
        <div className="info-grid">
          {features.map((feature) => (
            <article key={feature.title} className="info-card glass-panel">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section" aria-labelledby="about-stats-title">
        <h2 id="about-stats-title" className="section-heading">
          رقم‌هایی که در صفحه اصلی آمده است
        </h2>
        <dl className="stat-strip">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>
                {stat.target.toLocaleString("fa-IR")}
                {stat.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <PageCta title={aboutPage.closeTitle} text={aboutPage.closeText} />
    </>
  );
}