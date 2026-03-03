export default function ResumePage() {
  return (
    <section className="section">
      <div className="container">
        <h1>Resume Snapshot</h1>
        <div className="btn-row">
          <a
            href="https://drive.usercontent.google.com/uc?id=1OP9RKJdBSMt5aWLV97ZieE2S1Dg2vg1P&export=download"
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
          </a>
        </div>

        <div className="panel" style={{ marginTop: "1rem" }}>
          <h2>Education</h2>
          <ul className="list">
            <li>
              Macquarie University - Master of Information Technology in Artificial Intelligence (Jul 2024 - Nov 2025)
            </li>
            <li>
              BRAC University - BSc in Computer Science (Jan 2020 - Sep 2023)
            </li>
          </ul>
        </div>

        <div className="panel" style={{ marginTop: "1rem" }}>
          <h2>Experience</h2>
          <h3>AI Research Intern, Truuth Pty Ltd (Jul 2025 - Nov 2025)</h3>
          <ul className="list muted">
            <li>Developed tampered-document detection systems using ViT and ELA.</li>
            <li>Implemented JPEG ELA analysis for recompression artifact detection.</li>
            <li>Used AWS SageMaker and S3 for dataset and evaluation workflows.</li>
            <li>Applied prompt engineering with GPT-4, LLaMA, and AWS Bedrock.</li>
          </ul>
          <h3>After School Facilitator, CodeCamp (May 2024 - Present)</h3>
          <ul className="list muted">
            <li>Taught Python and game design to students aged 8-13.</li>
            <li>Designed structured lesson plans across multi-session programs.</li>
          </ul>
        </div>

        <div className="panel" style={{ marginTop: "1rem" }}>
          <h2>Research</h2>
          <p className="muted">
            Segmentation of Bangla Compound Characters to Detect Handwritten Characters using YOLOv8.
          </p>
        </div>
      </div>
    </section>
  );
}
