import { features } from "@/config/content";

export function Features() {
  return (
    <>
      {features.map((feature) => (
        <section className="aww-section" key={feature.title}>
          <div className="feature-container">
            <div className="slide-icon-wrap reveal-element stagger-1">
              <lord-icon
                src={feature.icon}
                colors="primary:#F8F7FF,secondary:#8b5cf6"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="slide-text">
              <h2 className="sec-title shine-title reveal-element stagger-2">{feature.title}</h2>
              <p className="sec-desc reveal-element stagger-3">{feature.description}</p>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
