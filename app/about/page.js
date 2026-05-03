import { MinimalFooter } from '@/components/Footer';

const affiliations = [
  {
    role: 'President',
    org: 'Students for Public Health (S4PH)',
    place: 'San Diego State University',
  },
  {
    role: 'Research Assistant',
    org: 'DiMo Lab',
    place: 'PI: Naveen Vaidya · SDSU',
  },
  {
    role: 'Research Assistant',
    org: 'SDSU Imperial Valley Prevention Research Center',
    place: 'PI: Eyal Oren · SDSU',
  },
  {
    role: 'Visiting Scholar',
    org: 'Feinstein Institutes for Medical Research',
    place: 'PI: Theodoros Zanos',
  },
];

export default function AboutPage() {
  return (
    <>
      <style>{`
        .cv-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 2px;
          color: #54161D;
          border: 0.75px solid rgba(84,22,29,0.4);
          padding: 12px 24px;
          transition: background 0.2s ease, color 0.2s ease;
          text-decoration: none;
        }
        .cv-button:hover {
          background: #54161D;
          color: #FFFBF0;
        }
      `}</style>

      <div style={{
        padding: 'clamp(60px, 8vw, 100px) calc(var(--border-width) + 48px)',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <p style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '11px', letterSpacing: '3px',
          color: 'rgba(84,22,29,0.5)', marginBottom: '48px',
        }}>
          ABOUT
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(180px, 28%, 260px) 1fr',
          gap: '56px', alignItems: 'start',
          marginBottom: '80px',
        }}>
          {/* Portrait */}
          <div>
            <div style={{
              width: '100%', aspectRatio: '3/4',
              background: 'rgba(84,22,29,0.08)',
              border: '0.5px solid rgba(84,22,29,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {/* Replace with: <img src="/images/portrait.jpg" alt="Thea Enache" style={{ width:'100%', height:'100%', objectFit:'cover' }} /> */}
              <p style={{
                fontFamily: "'Cinzel', serif", fontSize: '10px',
                letterSpacing: '1.5px', color: 'rgba(84,22,29,0.3)',
                textAlign: 'center', padding: '20px',
              }}>
                YOUR PORTRAIT<br/>GOES HERE
              </p>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '400', color: '#54161D',
              lineHeight: '1.1', marginBottom: '28px',
            }}>
              Thea Enache
            </h1>

            {/* ── REPLACE THESE PARAGRAPHS WITH YOUR BIO ── */}
            <p style={{ marginBottom: '20px', color: 'rgba(84,22,29,0.8)', lineHeight: '1.8' }}>
              blah paragraph1
            </p>
            <p style={{ marginBottom: '20px', color: 'rgba(84,22,29,0.8)', lineHeight: '1.8' }}>
              bleh para 2
            </p>
            <p style={{ color: 'rgba(84,22,29,0.8)', lineHeight: '1.8' }}>
              Abloo para 3
            </p>

            <div style={{ marginTop: '36px' }}>
              <a href="/cv.pdf" download className="cv-button">
                <span>↓</span> DOWNLOAD CV
              </a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '0.5px solid rgba(84,22,29,0.15)', marginBottom: '60px' }}/>

        <div>
          <p style={{
            fontFamily: "'Cinzel', serif", fontSize: '11px',
            letterSpacing: '3px', color: 'rgba(84,22,29,0.5)',
            marginBottom: '32px',
          }}>
            CURRENT AFFILIATIONS
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {affiliations.map((item, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.5fr',
                gap: '24px',
                padding: '20px 0',
                borderBottom: '0.5px solid rgba(84,22,29,0.1)',
                alignItems: 'start',
              }}>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '12px', color: 'rgba(84,22,29,0.5)',
                  letterSpacing: '0.5px',
                }}>
                  {item.role}
                </p>
                <div>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '17px', color: '#54161D', marginBottom: '4px',
                  }}>
                    {item.org}
                  </p>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: '300',
                    fontSize: '12px', color: 'rgba(84,22,29,0.5)',
                  }}>
                    {item.place}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MinimalFooter />
    </>
  );
}