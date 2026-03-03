const skillGroups = [
  {
    title: "AI and LLM Systems",
    items: [
      "Agentic AI",
      "AutoGen Framework",
      "Retrieval-Augmented Generation (RAG)",
      "Prompt Engineering (GPT-4, LLaMA)",
      "Vector Databases (ChromaDB)",
      "Azure AI Studio",
      "AWS SageMaker"
    ]
  },
  {
    title: "Computer Vision and ML",
    items: [
      "PyTorch",
      "TensorFlow",
      "OpenCV",
      "ViT",
      "YOLOv8",
      "CNNs",
      "ELA Heatmaps",
      "Image Registration",
      "2D-3D Transformation"
    ]
  },
  {
    title: "Backend and Web",
    items: [
      "Python",
      "JavaScript",
      "ReactJS",
      "Django",
      "REST APIs",
      "FastAPI",
      "Tailwind",
      "Bootstrap",
      "HTML/CSS"
    ]
  },
  {
    title: "Data and Engineering Tools",
    items: [
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Tesseract OCR",
      "SQL",
      "Docker",
      "Git/GitHub",
      "VS Code",
      "Jupyter"
    ]
  }
];

export default function SkillsPage() {
  return (
    <section className="section">
      <div className="container">
        <h1>Skills</h1>
        <p className="muted">
          Technical capabilities from AI systems to production-focused engineering.
        </p>
        <div className="card-grid" style={{ marginTop: "1rem" }}>
          {skillGroups.map((group) => (
            <article key={group.title} className="card">
              <h3>{group.title}</h3>
              <div className="tag-wrap">
                {group.items.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
