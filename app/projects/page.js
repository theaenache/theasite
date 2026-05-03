'use client';
import { useState, Fragment } from 'react';
import { MinimalFooter } from '@/components/Footer';

const projects = [
  {
    id: 1,
    title: 'Multi-Scale SARS-CoV-2 Model',
    year: '2024–2025',
    tags: ['Computational Epidemiology', 'Mathematical Modeling'],
    description: 'A within-host and between-host computational model of SARS-CoV-2 transmission dynamics, developed in collaboration with the DiMo Lab under PI Naveen Vaidya.',
    collaborators: 'Naveen Vaidya, SDSU DiMo Lab',
    link: null,
    cover: null,
  },
  {
    id: 2,
    title: 'IVPRC Heat Surveillance Dashboard',
    year: '2024',
    tags: ['Public Health', 'Data Engineering', 'React'],
    description: 'A Python-based RSS monitoring pipeline and React dashboard tracking heat-related illness news coverage for the Imperial Valley Prevention Research Center.',
    collaborators: 'Eyal Oren, Miguel Angel Zavala Perez',
    link: null,
    cover: null,
  },
  {
    id: 3,
    title: 'Your Next Project',
    year: '2025',
    tags: ['Add', 'Tags'],
    description: 'Replace this with your project description.',
    collaborators: null,
    link: null,
    cover: null,
  },
];

const patternImages = [
  '/patterns/patt1.png',
  '/patterns/patt2.png',
  '/patterns/patt3.png',
  '/patterns/patt4.png',
  '/patterns/patt5.png',
  '/patterns/patt6.png',
  '/patterns/patt7.png',
];

function PatternTile({ index }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#FFFBF0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12%',
    }}>
      <img
        src={patternImages[index % patternImages.length]}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 500,
      background: 'rgba(84,22,29,0.15)',
      backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#FFFBF0',
        border: '0.75px solid rgba(84,22,29,0.25)',
        maxWidth: '560px', width: '100%',
        padding: '48px', position: 'relative',
        maxHeight: '80vh', overflowY: 'auto',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '20px', right: '20px',
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: "'Cinzel', serif", fontSize: '11px',
          letterSpacing: '1.5px', color: 'rgba(84,22,29,0.5)',
        }}>
          CLOSE ×
        </button>
        <p style={{
          fontFamily: "'Cinzel', serif", fontSize: '10px',
          letterSpacing: '2px', color: 'rgba(84,22,29,0.45)', marginBottom: '12px',
        }}>
          {project.year}
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '28px', fontWeight: '500',
          color: '#54161D', lineHeight: '1.2', marginBottom: '20px',
        }}>
          {project.title}
        </h2>
        {project.tags?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: "'Cinzel', serif", fontSize: '9px',
                letterSpacing: '1px', color: '#54161D',
                border: '0.5px solid rgba(84,22,29,0.3)',
                padding: '4px 10px',
              }}>
                {tag.toUpperCase()}
              </span>
            ))}
          </div>
        )}
        <p style={{
          fontFamily: "'Inter', sans-serif", fontWeight: '300',
          fontSize: '14px', color: 'rgba(84,22,29,0.8)',
          lineHeight: '1.75', marginBottom: '20px',
        }}>
          {project.description}
        </p>
        {project.collaborators && (
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '12px',
            color: 'rgba(84,22,29,0.55)', marginBottom: '20px',
          }}>
            With {project.collaborators}
          </p>
        )}
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: "'Cinzel', serif", fontSize: '10px',
            letterSpacing: '1.5px', color: '#54161D',
            border: '0.5px solid rgba(84,22,29,0.4)',
            padding: '10px 20px', textDecoration: 'none',
          }}>
            VIEW PROJECT ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <style>{`
        .project-tile {
          aspect-ratio: 1/1;
          position: relative;
          border: 0.5px solid rgba(84,22,29,0.1);
          overflow: hidden;
          cursor: pointer;
          background: rgba(84,22,29,0.04);
        }
        .project-overlay {
          position: absolute;
          inset: 0;
          background: rgba(84,22,29,0.82);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          opacity: 0;
          transition: opacity 0.22s ease;
        }
        .project-tile:hover .project-overlay { opacity: 1; }
        .pattern-tile {
          aspect-ratio: 1/1;
          position: relative;
          border: 0.5px solid rgba(84,22,29,0.1);
          overflow: hidden;
        }
      `}</style>

      <div style={{ padding: 'clamp(60px, 8vw, 100px) calc(var(--border-width) + 48px)' }}>
        <p style={{
          fontFamily: "'Cinzel', serif", fontSize: '11px',
          letterSpacing: '3px', color: 'rgba(84,22,29,0.5)',
          marginBottom: '48px',
        }}>
          PROJECTS
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px' }}>
          {projects.map((project, i) => (
            <Fragment key={project.id}>
              {i % 2 === 0 ? (
                <>
                  <div key={`pat-${i}`} className="pattern-tile">
                  <PatternTile index={i} />
                </div>
                <div key={`proj-${i}`} className="project-tile" onClick={() => setSelected(project)}>
                  {project.cover && <img src={project.cover} alt={project.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>}
                  <div className="project-overlay">
                    <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'18px', fontWeight:'500', color:'#FFFBF0', textAlign:'center', lineHeight:'1.3' }}>{project.title}</p>
                    <p style={{ fontFamily:"'Cinzel', serif", fontSize:'9px', letterSpacing:'1.5px', color:'rgba(255,251,240,0.55)', marginTop:'10px' }}>CLICK TO LEARN MORE</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div key={`proj-${i}`} className="project-tile" onClick={() => setSelected(project)}>
                  {project.cover && <img src={project.cover} alt={project.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>}
                  <div className="project-overlay">
                    <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'18px', fontWeight:'500', color:'#FFFBF0', textAlign:'center', lineHeight:'1.3' }}>{project.title}</p>
                    <p style={{ fontFamily:"'Cinzel', serif", fontSize:'9px', letterSpacing:'1.5px', color:'rgba(255,251,240,0.55)', marginTop:'10px' }}>CLICK TO LEARN MORE</p>
                  </div>
                </div>
                <div key={`pat-${i}`} className="pattern-tile">
                  <PatternTile index={i} />
                </div>
              </>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
      <MinimalFooter />
    </>
  );
}