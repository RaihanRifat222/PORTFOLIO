import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container grid-2">
          <div>
            <p className="kicker">AI Engineer and Builder</p>
            <h1>Md Raihanul Islam Bhuiyan</h1>
            <p className="muted">
              Master&apos;s student in AI with hands-on experience in computer vision,
              agentic AI systems, and document forensics. I build
              retrieval-grounded and multi-agent AI workflows that are practical and reliable.
            </p>
            <div className="btn-row">
              <Link href="/projects" className="btn btn-primary">
                View Projects
              </Link>
              <Link href="/resume" className="btn btn-secondary">
                Resume Snapshot
              </Link>
              <Link href="/chat" className="btn btn-secondary">
                Chat With My AI Version
              </Link>
            </div>
          </div>
          <aside className="panel">
            <h3>Quick Facts</h3>
            <ul className="list muted">
              <li>Location: Sydney, NSW, Australia</li>
              <li>Master of IT in AI, Macquarie University</li>
              <li>Focused on RAG, AutoGen, CV, FastAPI</li>
              <li>Open to AI Engineer roles</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section block-alt">
        <div className="container">
          <div className="section-head">
            <h2>Skills</h2>
            <Link href="/skills" className="card-link">
              View full skills profile
            </Link>
          </div>
          <div className="card-grid skills-grid">
            <article className="card">
              <h3>AI and LLM</h3>
              <div className="tag-wrap">
                {["RAG", "AutoGen", "Prompt Engineering", "Azure AI Studio", "AWS SageMaker"].map((skill) => (
                  <span className="tag" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
            <article className="card">
              <h3>Computer Vision</h3>
              <div className="tag-wrap">
                {["PyTorch", "TensorFlow", "YOLOv8", "ViT", "OpenCV", "ELA Heatmaps"].map((skill) => (
                  <span className="tag" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
            <article className="card">
              <h3>Backend and Product</h3>
              <div className="tag-wrap">
                {["Python", "FastAPI", "Django", "React", "SQL", "Docker"].map((skill) => (
                  <span className="tag" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Highlights</h2>
          <div className="card-grid">
            <article className="card">
              <h3>AI Research Intern - Truuth Pty Ltd</h3>
              <p className="muted">
                Built tampered-document detection pipelines using ViT and ELA,
                generated synthetic fraud datasets, and explored LLM workflows for internal analysis.
              </p>
            </article>
            <article className="card">
              <h3>SmartCourse</h3>
              <p className="muted">
                Full-stack agentic curriculum generator with schema validation
                loops and course module regeneration.
              </p>
              <Link className="card-link" href="https://smart-course-i378.vercel.app/">
                Live Demo
              </Link>
            </article>
            <article className="card">
              <h3>Research Publication</h3>
              <p className="muted">
                Segmentation of Bangla compound handwritten characters
                using YOLOv8.
              </p>
              <Link
                className="card-link"
                href="https://www.researchgate.net/publication/380829534"
              >
                Publication
              </Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
