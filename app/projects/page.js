'use client';
import { useState } from 'react';
import { MinimalFooter } from '@/components/Footer';

const projects = [
  {
    id: 1,
    title: 'Multi-Scale SARS-CoV-2 Transmission Model',
    year: 'July 2025 — Present',
    tags: ['Computational Epidemiology', 'Mathematical Modeling', 'MATLAB', 'Python'],
    description: 'In the fall of 2025 I reached out to Dr. Naveen Vaidya after developing an interest in the mathematics underlying epidemiological modeling. We had a series of conversations about the scope of what I wanted to learn, and together decided to build a modeling framework connecting within-host viral dynamics to between-host transmission risk in SARS-CoV-2, using experimental ferret data.\n\nI developed the model independently under Dr. Vaidya\'s guidance, working across MATLAB and Python. The project is ongoing and details are being withheld ahead of publication.\n\nIn Spring 2026 I gave an oral presentation at the S3 Student Research Symposium, and presented a poster at the San Diego Epidemiology Exchange.',
    collaborators: 'PI: Naveen Vaidya · SDSU DiMo Lab',
    link: null,
    cover: null,
    images: [
      { src: '/projects/s31.jpeg', caption: 'Oral presentation at the S3 Student Research Symposium, Spring 2026' },
      { src: '/projects/s32.jpeg', caption: 'DiMo Lab at S3 Student Research Symposium, 2026' },
      { src: '/projects/epixchange.jpeg', caption: 'San Diego Epidemiology Exchange, 2026' },
    ],
  },
  {
    id: 2,
    title: 'IVPRC Heat Surveillance Dashboard',
    year: '2024',
    tags: ['Public Health', 'Data Engineering', 'Data Visualization'],
    description: 'fill deets',
    collaborators: 'Eyal Oren, Miguel Angel Zavala Perez',
    link: null,
    cover: null,
    images: [],
  },
  {
    id: 3,
    title: 'Sekeh Lab Deep Learning Bootcamp',
    year: 'July 25th, 2025',
    tags: ['Teaching', 'Neural Networks'],
    description: 'Replace this with your project description.',
    collaborators: 'Jake Basile, Saad Alrajhi, Francis Fernandez, Joshua Andle, Mary Isabelle Wisell, Aditi Naiknaware, Dr. Salimeh Sekeh' 
    link: https://www.youtube.com/watch?v=uyqLTw3djKk,
    cover: null,
    images: [],
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
    <div style={{ width: '100%', height: '100%', background: '#FFFBF0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12%' }}>
      <img src={patternImages[index % patternImages.length]} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}/>
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
        maxWidth: '620px', width: '100%',
        padding: '48px', position: 'relative',
        maxHeight: '85vh', overflowY: 'auto',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '20px', right: '20px',
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: "'Cinzel', serif", fontSize: '11px',
          letterSpacing: '1.5px', color: 'rgba(84,22,29,0.5)',
        }}>
          CLOSE ×
        </button>

        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '2px', color: 'rgba(84,22,29,0.45)', marginBottom: '12px' }}>
          {project.year}
        </p>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: '500', color: '#54161D', lineHeight: '1.2', marginBottom: '20px' }}>
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

        {/* Description with line breaks */}
        <div style={{ marginBottom: '24px' }}>
          {project.description.split('\n\n').map((para, i) => (
            <p key={i} style={{
              fontFamily: "'Inter', sans-serif", fontWeight: '300',
              fontSize: '14px', color: 'rgba(84,22,29,0.8)',
              lineHeight: '1.75', marginBottom: '14px',
            }}>
              {para}
            </p>
          ))}
        </div>

        {project.collaborators && (
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'rgba(84,22,29,0.55)', marginBottom: '28px' }}>
            {project.collaborators}
          </p>
        )}

        {/* Photo gallery */}
        {project.images?.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '8px' }}>
            <div style={{ borderTop: '0.5px solid rgba(84,22,29,0.15)', paddingTop: '24px' }}>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '2px', color: 'rgba(84,22,29,0.4)', marginBottom: '16px' }}>
                PHOTOS
              </p>
              {project.images.map((img, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <img src={img.src} alt={img.caption} style={{ width: '100%', height: 'auto', display: 'block', marginBottom: '8px' }}/>
                  {img.caption && (
                    <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '1.5px', color: 'rgba(84,22,29,0.4)', textAlign: 'center' }}>
                      {img.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: "'Cinzel', serif", fontSize: '10px',
            letterSpacing: '1.5px', color: '#54161D',
            border: '0.5px solid rgba(84,22,29,0.4)',
            padding: '10px 20px', textDecoration: 'none', marginTop: '16px',
          }}>
            VIEW PROJECT
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
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '11px', letterSpacing: '3px', color: 'rgba(84,22,29,0.5)', marginBottom: '48px' }}>
          PROJECTS
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px' }}>
          {projects.map((project, i) => (
            i % 2 === 0 ? (
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
            )
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
      <MinimalFooter />
    </>
  );
}