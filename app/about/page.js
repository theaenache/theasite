import { MinimalFooter } from '@/components/Footer';

const affiliations = [
  {
    role: 'Research Assistant',
    org: 'SDSU Imperial Valley Prevention Research Center',
    place: 'PI: Eyal Oren, Miguel Angel Zavala Perez · SDSU-IV · School of Public Health',
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
    place: 'PI: Salimeh Yasaei Sekeh · SDSU · Computer Science Department',
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
    place: 'PI: Naveen Vaidya · SDSU · Department of Mathematics and Statistics',
    url: 'https://nvaidya.sdsu.edu/DiMoLab.html',
  },
];

export default function AboutPage() {
  return (
    <>
      <style>{`
        @font-face {
          font-family: 'Aston';
          src: url('/fonts/aston.ttf') format('truetype');
        }
        @font-face {
          font-family: 'Vilaka';
          src: url('/fonts/vilaka.ttf') format('truetype');
        }
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
              fontFamily: "'Aston', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '400', color: '#54161D',
              lineHeight: '1.1', marginBottom: '28px',
              textAlign: 'center',
            }}>
              Thea L. Enache
            </h1>

            <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0 28px' }}>
              <img src="/titlesep.png" alt="" style={{ height: '22px', width: 'auto', opacity: 0.9 }} />
            </div>

            <p style={{ marginBottom: '20px', color: 'rgba(84,22,29,0.8)', lineHeight: '1.8', textAlign: 'left' }}>
              I grew up between two places: Romania, my first language and where my familial lineage is rooted, and the Bay Area, where I spent the majority of my adolesence. Both of those places shaped how I see the world and what I care about. In Romania, I saw up close how inequity shapes health outcomes in a system that is beyond understaffed and underfunded. In the Bay Area, I was exposed to how innovation could be a powerful force for good, but also how it can exacerbate inequities when it's not built with everyone in mind.
            </p>

            <p style={{ marginBottom: '20px', color: 'rgba(84,22,29,0.8)', lineHeight: '1.8', textAlign: 'left' }}>
              In Romania, care is something you and your family negotiate constantly. What happens to you in a medical setting depends almost entirely on who you slipped some incentives (via cheese, wine, money, etc.) to at the door wherever you ended up. Health records are handwritten on paper, and symptoms are only addressed in a timely fashion if you are lucky and have spread enough "love" by the time you need it. Often even that isn't enough when the healthcare system is as burdened as it is, I experienced that first hand. I saw people I love face the repercussions from undergoing brain surgery with tools that were contaminated at a very young age due to a simple lack of access to resources. I quickly realized that that did not exist in a vacuum, and that it actually was a reality that people face almost everywhere. Consequentially, I understood very early on that medicine was not neutral, that systems were not neutral, but rather that who you are, what you have, and particularly where you live, determines what you receive, often long before you're sick.
            </p>

            <p style={{ marginBottom: '20px', color: 'rgba(84,22,29,0.8)', lineHeight: '1.8', textAlign: 'left' }}>
              In California, the Bay Area taught me to always keep my ears perked in regards to what the tech field was up to. I grew up taking things apart with my father, and my fourth language was Python. I was convinced that innovation could solve all the mild inconveniences in my life. In fourth grade I was scared to take my hands off the handlebars to signal a turn, so I built lights that would do it for me: the top halfs of water bottles, a plastic box with two arrows drilled into it, LEDs, spare parts, and a dream. I loved building things that solved something. Slowly and then all at once, things got far more serious, and I saw who the big innovations were actually built for. Also, who they often failed to keep in mind. I continue to thoroughly enjoy developing targeted solutions to specific problems, but I have since gained significant context on the broader scale implications of certain broader scale initiatives. I have learned that innovation is not inherently good, and that it can be a powerful force for harm if it is not built with equity in mind.
            </p>

            <p style={{ marginBottom: '20px', color: 'rgba(84,22,29,0.8)', lineHeight: '1.8', textAlign: 'left' }}>
              I now exist in that grey zone, somewhere between those two places. I aim to utilize computational methods to build tools for public health, with equity always considered and always centered.
            </p>

            <p style={{ marginBottom: '20px', color: 'rgba(84,22,29,0.8)', lineHeight: '1.8', textAlign: 'left' }}>
              To hopefully provide me with the background I need to embark on this, I am completing dual degrees in Public Health and Mathematical Data Science + Computer Science at San Diego State University. I have been very fortunate to work at the intersection of public health and computational modeling in various regards early in my career. Thus far, that has been through epidemiological modeling, or developing clinical AI tools to address specific health access problems. I have also been very fortunate to work on projects that involve evaluating whether existing solutions are effectively reaching those they are designed for, which has been some of my favourite work thus far. I eventually want to work on problems like this across the globe.
            </p>

            <p style={{ color: 'rgba(84,22,29,0.8)', lineHeight: '1.8', textAlign: 'left' }}>
              Please feel free to pick around this page to follow along on my journey :)
            </p>

            <div style={{ marginTop: '36px' }}>
              <a href="/cv.pdf" download className="cv-button">
                ↓ DOWNLOAD CV
              </a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '0.5px solid rgba(84,22,29,0.15)', marginBottom: '60px' }} />

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