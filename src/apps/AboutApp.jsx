import { Mail, Github, Globe, MapPin, GraduationCap, Trophy } from 'lucide-react'
import { profile } from '../data/profile'

export default function AboutApp() {
  return (
    <div className="about">
      <header className="about-head">
        <div className="avatar">{profile.initials}</div>
        <div>
          <h1>{profile.name}</h1>
          <p className="accent">{profile.title}</p>
          <p className="muted small"><MapPin size={12} /> {profile.location}</p>
        </div>
      </header>

      <div className="links">
        <a className="btn" href={`mailto:${profile.email}`}><Mail size={14} /> Email</a>
        <a className="btn" href={profile.github} target="_blank" rel="noreferrer"><Github size={14} /> GitHub</a>
        <a className="btn" href={profile.site} target="_blank" rel="noreferrer"><Globe size={14} /> aruno.buildc3.tech</a>
      </div>

      <section>
        <h2>Bio</h2>
        {profile.bio.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
      </section>

      <section>
        <h2>Experience</h2>
        {profile.experience.map((x) => (
          <div key={x.org} className="xp">
            <div className="xp-head"><strong>{x.role}</strong><span className="muted small">{x.period}</span></div>
            <div className="muted">{x.org}</div>
            <ul>{x.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        {Object.entries(profile.skills).map(([group, items]) => (
          <div key={group} className="skill-row">
            <span className="muted small">{group}</span>
            <div className="chips">{items.map((s) => <span key={s} className="chip">{s}</span>)}</div>
          </div>
        ))}
      </section>

      <section>
        <h2><GraduationCap size={16} /> Education</h2>
        <p><strong>{profile.education.school}</strong><br />{profile.education.degree} · <span className="muted">{profile.education.period}</span></p>
      </section>

      <section>
        <h2><Trophy size={16} /> Achievements</h2>
        <ul>{profile.achievements.map((a) => <li key={a}>{a}</li>)}</ul>
      </section>
    </div>
  )
}
