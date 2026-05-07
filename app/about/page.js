import { MinimalFooter } from '@/components/Footer';

const affiliations = [
  {
    role: 'Research Assistant',
    org: 'SDSU Imperial Valley Prevention Research Center',
    place: 'PI: Eyal Oren, Miguel Angel Zavala Perez · SDSU-IV',
    url: 'https://ivprc.sdsu.edu/',
  },
  {
    role: 'Visiting Scholar',
    org: 'Feinstein Institutes for Medical Research',
    place: 'PI: Theodoros Zanos · Feinstein Institutes for Medical Research, Northwell Health · Division of Health AI, Department of Bioelectric Medicine',
    url: 'https://feinstein.northwell.edu/institutes-researchers/our-researchers/theodoros-zanos-phd',
  },
  {
    role: 'Researcher',
    org: 'Sekeh Lab',
    place: 'PI: Salimeh Yasaei Sekeh · SDSU',
    url: 'https://salimehsekeh.wixsite.com/sekeh-lab',
  },
  {
    role: 'Research and Grant Project Analyst',
    org: 'Proactive FQHC',
    place: 'Sunnyvale, CA',
    url: 'https://www.proactivefqhc.org/',
  },
  {
    role: 'Research Assistant',
    org: 'DiMo Lab',
    place: 'PI: Naveen Vaidya · SDSU',
    url: 'https://nvaidya.sdsu.edu/DiMoLab.html',
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
        .affil-link {
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          color: #54161D;
          margin-bottom: 4px;
          display: inline-block;
          text-decoration: none;
          border-bottom: 0.5px solid transparent;
          transition: border-color 0.2s ease;
        }
        .affil-link:hover {
          border-bottom-color: #54161D;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .about-grid img {
            margin: 0 auto;
            max-width: 260px;
          }
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

        <div className="about-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(220px, 32%, 340px) 1fr',
          gap: '56px',
          alignItems: 'start',
          marginBottom: '80px',
        }}>
          {/* Portrait */}
          <div style={{ width: '100%' }}>
            <img
              src="/images/headshot.png"
              alt="Thea Enache"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          {/* Bio */}
          <div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '400', color: '#54161D',
              lineHeight: '1.1', marginBottom: '28px',
              textAlign: 'center',
            }}>
              Thea Enache
            </h1>

            <p style={{ marginBottom: '20px', color: 'rgba(84,22,29,0.8)', lineHeight: '1.8', textAlign: 'left' }}>
              I grew up between two places that couldn't agree on much of anything, particularly in regards to how best to keep people alive.
            </p>
            <p style={{ marginBottom: '20px', color: 'rgba(84,22,29,0.8)', lineHeight: '1.8', textAlign: 'left' }}>
              In Romania, I watched my grandparents navigate a system where care was something that was constantly negotiated by you and your family. Where the quality of what happened to you in a medical setting depended almost entirely on who you slipped a gift to at the door, at the desk, at the cardiologist, the care facility, wherever you found yourself. Where medical records were handwritten on paper and stored in folders that could be misplaced forever with one slipup. Where symptoms were addressed as they appeared, if you were lucky, and if you had paid enough people by then. I saw people I loved operated on with tools that should not have been used. Seeing how that influenced the life of my loved ones, I understood early on in my life that medicine was not neutral. That systems were not neutral. That who you were and what you had determined what you received, often long before you were sick.
            </p>
            <p style={{ marginBottom: '20px', color: 'rgba(84,22,29,0.8)', lineHeight: '1.8', textAlign: 'left' }}>
              In California, the calculus was different but the conclusion was the same. The Bay Area taught me to believe in what technology could do. I grew up taking things apart with my father, watching the world accelerate, absorbing the genuine conviction that innovation could solve things. In fourth grade I was scared to take my hands off the handlebars to signal a turn, so I built lights that would do it for me using the top halfs of plastic water bottles, a plastic box, LEDs, and spare parts from my father's computer construction days. I loved tinkering with technology, and I loved developing fun usable tools. Through prolonged exposure to the Bay Area, it also showed me, slowly and then all at once, who the big innovations were actually built to benefit. A different flavor of institutional greed, a different set of people left outside it.
            </p>
            <p style={{ marginBottom: '20px', color: 'rgba(84,22,29,0.8)', lineHeight: '1.8', textAlign: 'left' }}>
              I exist somewhere between those two places. Not quite from either -- both on the academic, and on the cultural side. That position used to feel like a problem, and I am proud to report that I have since found my strength in it.
            </p>
            <p style={{ marginBottom: '20px', color: 'rgba(84,22,29,0.8)', lineHeight: '1.8', textAlign: 'left' }}>
              I'm Thea Enache, an undergraduate at San Diego State University completing dual degrees in Public Health and Mathematical Data Science + Computer Science, with a minor in Statistics. My work sits at the intersection of public health, AI, and computational modeling. Sometimes that looks like epidemiological modeling, sometimes it looks like building equity centered clinical AI tools, and sometimes it looks like asking whether the technology we already have is actually reaching the people it should. The systems I watched fail my grandparents exist in some form everywhere. The data that could help fix them rarely crosses borders cleanly, and the tools built to analyze it are rarely designed with the most burdened populations in mind. I want to work on that problem across global health epidemiology, health-focused AI, and the policy frameworks that determine whether any of it ever reaches the people who need it most.
            </p>
            <p style={{ marginBottom: '20px', color: 'rgba(84,22,29,0.8)', lineHeight: '1.8', textAlign: 'left' }}>
              I believe public institutions are where this work belongs. In this setting, serving everyone should be the design constraint. The math has to work for the person who can't bribe anyone. It has to work for the people my grandparents were.
            </p>
            <p style={{ color: 'rgba(84,22,29,0.8)', lineHeight: '1.8', textAlign: 'left' }}>
              That's what I'm building toward. Please feel free to pick around this page to follow along on my journey :)
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
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="affil-link"
                    >
                      {item.org}
                    </a>
                  ) : (
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '17px', color: '#54161D', marginBottom: '4px',
                    }}>
                      {item.org}
                    </p>
                  )}
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