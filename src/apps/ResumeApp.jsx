import { Download } from 'lucide-react'
import { profile } from '../data/profile'

export default function ResumeApp() {
  return (
    <div className="resume">
      <div className="resume-bar">
        <span>{profile.resumeName}</span>
        <a className="btn primary" href={profile.resume} download><Download size={14} /> Download</a>
      </div>
      <iframe src={profile.resume} title="Resume" />
    </div>
  )
}
