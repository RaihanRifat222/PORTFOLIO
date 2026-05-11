import { useEffect, useRef } from 'react'
import { skillGroups, toolChips } from '../data/skills'

function SkillBar({ skill, groupIndex, skillIndex }) {
  return (
    <div className="skill-item">
      <div className="skill-info">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-pct">{skill.level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-fill"
          style={{
            '--pct': `${skill.level}%`,
            animationDelay: `${groupIndex * 0.08 + skillIndex * 0.07}s`,
          }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('anim-ready'); observer.disconnect() } },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header section-animate">
          <span className="section-label">Capabilities</span>
          <h2 className="section-title">
            What I <span className="accent">work with</span>
          </h2>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, gi) => (
            <div
              key={group.category}
              className="skill-group section-animate"
              style={{ transitionDelay: `${gi * 0.08}s` }}
            >
              <div className="skill-group-header">
                <span className="skill-group-icon" aria-hidden="true">{group.icon}</span>
                <span className="skill-group-name">{group.category}</span>
              </div>
              {group.skills.map((s, si) => (
                <SkillBar key={s.name} skill={s} groupIndex={gi} skillIndex={si} />
              ))}
            </div>
          ))}
        </div>

        <div className="tools-section section-animate">
          <p className="tools-label">All Tools &amp; Technologies</p>
          <div className="tools-chips">
            {toolChips.map((chip) => (
              <span key={chip} className="tool-chip">{chip}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
