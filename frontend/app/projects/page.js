import Link from "next/link";

const projects = [
  {
    title: "SmartCourse - Agentic AI Curriculum Builder",
    stack: "FastAPI, React, JSON Schema, LLMs",
    description:
      "Agentic pipeline for curriculum architect, validator, and module authoring, with strict schema validation and regeneration loops.",
    github: "https://github.com/RaihanRifat222/SmartCourse",
    live: "https://smart-course-i378.vercel.app/"
  },
  {
    title: "Agentic IT Support System",
    stack: "AutoGen, Azure AI, Vector Retrieval",
    description:
      "Collaborating agents for issue classification, semantic retrieval, and grounded solution generation over historical ticket knowledge.",
    github: "https://github.com/RaihanRifat222/Agentic_IT_Support"
  },
  {
    title: "SpiritHelp - RAG System",
    stack: "LangChain, ChromaDB, GPT-4",
    description:
      "Retrieval-grounded conversational app focused on reducing hallucinations and improving responsible response behavior.",
    live: "https://huggingface.co/spaces/RaihanRifat222/SpiritHelp"
  }
];

export default function ProjectsPage() {
  return (
    <section className="section">
      <div className="container">
        <h1>Projects</h1>
        <p className="muted">
          Selected AI and software projects aligned with production use-cases.
        </p>

        <div className="card-grid">
          {projects.map((project) => (
            <article key={project.title} className="card">
              <h3>{project.title}</h3>
              <p>
                <strong>Stack:</strong> {project.stack}
              </p>
              <p className="muted">{project.description}</p>
              <div className="btn-row">
                {project.github ? (
                  <Link className="btn btn-secondary" href={project.github}>
                    GitHub
                  </Link>
                ) : null}
                {project.live ? (
                  <Link className="btn btn-primary" href={project.live}>
                    Live
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
