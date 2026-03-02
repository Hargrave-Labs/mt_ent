import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Camera, MapPin, Film, Eye } from 'lucide-react';
import CustomCursor from './CustomCursor';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const tlRef = useRef(null);
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);
  const servicesRef = useRef(null);
  const footerRef = useRef(null);

  const [activeService, setActiveService] = useState('v-commercial');

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scrolling for luxury feel
    const lenis = new Lenis({
      duration: 1.6, // Longer duration for an elegant, heavy feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.8,
      smoothTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 2. Hero "Lights On" Cinematic Intro Animation
    const ctx = gsap.context(() => {
      gsap.set('.header', { opacity: 0, y: 30 });
      gsap.set('.headline .word', { y: '115%' });
      gsap.set('.bio-grid', { opacity: 0, y: 30 });
      gsap.set('.cta-group', { opacity: 0, y: 30 });
    }, containerRef);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tlRef.current = tl;

    tl.to('.studio-light', { opacity: 0.1, duration: 0.6, ease: "power2.inOut" });

    // Realistic LED flicker
    const flickerTl = gsap.timeline();
    flickerTl.to('.left .diffuser-screen', { fill: '#ffffff', duration: 0.03 })
      .to('.left .diffuser-screen', { fill: '#0a0a0a', duration: 0.05 })
      .to('.left .diffuser-screen', { fill: '#ffffff', duration: 0.04 })
      .to('.left .diffuser-screen', { fill: '#0a0a0a', duration: 0.08 })
      .to('.left .diffuser-screen', { fill: '#ffffff', duration: 0.1 });

    flickerTl.to('.right .diffuser-screen', { fill: '#ffffff', duration: 0.04 }, 0.06)
      .to('.right .diffuser-screen', { fill: '#0a0a0a', duration: 0.06 }, ">")
      .to('.right .diffuser-screen', { fill: '#ffffff', duration: 0.1 }, "+=0.03");

    tl.add(flickerTl, "+=0.1");
    tl.to('.light-beam', { opacity: 0.5, duration: 0.3, ease: "power2.out" }, "-=0.1");

    // The Reveal Wipe
    tl.to('.light-wipe', { scale: 3.5, opacity: 1, duration: 1.6, ease: "expo.out" }, "-=0.2")
      .to('.main-app', { backgroundColor: 'var(--bg-light)', duration: 0.1 }, "-=0.2")
      .to('.light-theme-bg', { opacity: 1, duration: 0.1 }, "-=0.2")
      .to('.light-wipe', { opacity: 0, duration: 1.2, ease: "power2.out" }, ">")
      .to('.light-beam', { opacity: 0.02, mixBlendMode: 'normal', duration: 1 }, "-=1");

    // Typography Stagger
    tl.to('.header', { opacity: 1, y: 0, duration: 1.4, ease: "expo.out" }, "-=1.8")
      .to('.headline .word', { y: '0%', stagger: 0.06, duration: 1.4, ease: "expo.out" }, "-=1.6")
      .to('.bio-grid', { opacity: 1, y: 0, duration: 1.4, ease: "expo.out" }, "-=1.4")
      .to('.cta-group', { opacity: 1, y: 0, duration: 1.4, ease: "expo.out" }, "-=1.5");

    // 3. Horizontal Scroll Pinning & Internal Parallax Effect
    if (horizontalRef.current) {
      const horizontalSection = horizontalRef.current;
      const scrollCards = gsap.utils.toArray('.scroll-card');
      const timelineOffset = 100 * (scrollCards.length - 1);

      // Create scroll trigger for horizontal movement
      const scrollTween = gsap.to(scrollCards, {
        xPercent: -timelineOffset,
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSection,
          pin: true,
          scrub: 1.5, // Smoother scrub
          snap: 1 / (scrollCards.length - 1),
          start: "top top",
          end: "+=3500", // longer scroll distance
        }
      });

      // Internal Image Parallax during horizontal scroll
      gsap.utils.toArray('.card-media img').forEach((img, i) => {
        gsap.to(img, {
          xPercent: 30, // move the image slightly opposite to scroll
          ease: "none",
          scrollTrigger: {
            trigger: horizontalSection,
            start: "top top",
            end: "+=3500",
            scrub: 1.5,
          }
        });
      });

      // Text reveals on horizontal scroll cards
      scrollCards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: horizontalSection,
          start: () => "top top-=" + (i * 1000 - 500),
          end: () => "top top-=" + ((i + 1) * 1000),
          toggleClass: { targets: card, className: "is-active" },
        });
      });
    }

    // 4. Parallax Hero Background Interactions
    const handleMouseMove = (e) => {
      if (window.innerWidth > 768) {
        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;

        gsap.to('.studio-light.left', { rotation: -35 + (mouseX * 4), x: mouseX * 25, y: mouseY * 20, duration: 2.5, ease: "power3.out" });
        gsap.to('.studio-light.right', { rotation: 35 + (mouseX * -4), x: mouseX * -25, y: mouseY * 15, duration: 2.5, ease: "power3.out" });
        gsap.to('.bg-pattern', { x: mouseX * -20, y: mouseY * -20, duration: 2.5, ease: "power3.out" });
      }
    };
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      tl.kill();
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleMagneticMove = (e, target) => {
    const rect = target.getBoundingClientRect();
    const x = (e.clientX - rect.left) - (rect.width / 2);
    const y = (e.clientY - rect.top) - (rect.height / 2);

    gsap.to(target, { x: x * 0.2, y: y * 0.2, duration: 0.7, ease: "power3.out" });
    const text = target.querySelector('.btn-text');
    if (text) gsap.to(text, { x: x * 0.1, y: y * 0.1, duration: 0.7, ease: "power3.out" });
  };

  const handleMagneticLeave = (target) => {
    gsap.to(target, { x: 0, y: 0, duration: 0.9, ease: "expo.out" });
    const text = target.querySelector('.btn-text');
    if (text) gsap.to(text, { x: 0, y: 0, duration: 0.9, ease: "expo.out" });
  };

  const handleServiceHover = (serviceId) => {
    setActiveService(serviceId);
  };

  return (
    <>
      <CustomCursor />
      <div className="void-bg"></div>

      <div className="main-app" ref={containerRef}>

        {/* --- SECTION 1: HERO --- */}
        <div className="light-theme-bg">
          <div className="bg-pattern"></div>
        </div>
        <div className="light-wipe left-wipe"></div>
        <div className="light-wipe right-wipe"></div>

        <section className="hero-section">
          <div className="parallax-container">
            <div className="studio-light left">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <g className="fixture">
                  <rect x="98" y="0" width="4" height="60" fill="#151515" />
                  <rect x="30" y="60" width="140" height="15" rx="2" fill="#0d0d0d" />
                  <path d="M 25 75 L 175 75 L 185 95 L 15 95 Z" fill="#0a0a0a" />
                  <path d="M 27 77 L 173 77 L 181 93 L 19 93 Z" className="diffuser-screen" fill="#050505" />
                  <path d="M 15 95 L 0 130 M 185 95 L 200 130" stroke="#151515" strokeWidth="1.5" fill="none" />
                </g>
              </svg>
              <div className="light-beam"></div>
            </div>

            <div className="studio-light right">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <g className="fixture">
                  <rect x="98" y="0" width="4" height="60" fill="#151515" />
                  <rect x="30" y="60" width="140" height="15" rx="2" fill="#0d0d0d" />
                  <path d="M 25 75 L 175 75 L 185 95 L 15 95 Z" fill="#0a0a0a" />
                  <path d="M 27 77 L 173 77 L 181 93 L 19 93 Z" className="diffuser-screen" fill="#050505" />
                  <path d="M 15 95 L 0 130 M 185 95 L 200 130" stroke="#151515" strokeWidth="1.5" fill="none" />
                </g>
              </svg>
              <div className="light-beam"></div>
            </div>
          </div>

          <main className="hero-container">
            <header className="header">
              <div className="logo">
                <span className="logo-text">mt_ent_</span>
              </div>
              <nav className="nav-links">
                <a href="#portfolio" className="nav-link">The Reel</a>
                <a href="#services" className="nav-link">Capabilities</a>
                <a href="#contact" className="nav-link">Contact</a>
              </nav>
            </header>

            <div className="hero-content">
              <div className="text-wrapper">
                <h1 className="headline" id="main-headline">
                  <span className="line"><span className="word">Cinematic</span> <span className="word playfair">craft</span></span>
                  <span className="line"><span className="word">for</span> <span className="word">modern</span> <span className="word playfair">storytellers.</span></span>
                </h1>

                <div className="bio-grid">
                  <div className="bio-item"><Film /><span>Director & DP</span></div>
                  <div className="bio-item"><MapPin /><span>Global Operations</span></div>
                  <div className="bio-item"><Camera /><span>ARRI Alexa Mini</span></div>
                  <div className="bio-item"><Eye /><span>High Edit</span></div>
                </div>

                <div className="cta-group" id="cta-group">
                  <button className="cta-primary magnetic-btn" onMouseMove={(e) => handleMagneticMove(e, e.currentTarget)} onMouseLeave={(e) => handleMagneticLeave(e.currentTarget)}>
                    <span className="btn-text">View the Archive</span>
                  </button>
                  <button className="cta-secondary magnetic-btn" onMouseMove={(e) => handleMagneticMove(e, e.currentTarget)} onMouseLeave={(e) => handleMagneticLeave(e.currentTarget)}>
                    <span className="btn-text">Collaborate</span>
                  </button>
                </div>
              </div>
            </div>
          </main>
        </section>

        {/* --- SECTION 2: HORIZONTAL REEL --- */}
        <section className="horizontal-section" ref={horizontalRef} id="portfolio">
          <div className="scroll-wrapper">

            <div className="scroll-card is-active">
              <div className="card-inner">
                <div className="card-media">
                  <img src="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop" alt="Commercial Reel" />
                  <div className="card-overlay"></div>
                </div>
                <div className="card-info">
                  <p className="card-role">Director of Photography</p>
                  <h2>Commercial <br />Showcase</h2>
                </div>
              </div>
            </div>

            <div className="scroll-card">
              <div className="card-inner">
                <div className="card-media">
                  <img src="https://images.unsplash.com/photo-1598387181032-a3103ea2714c?q=80&w=2078&auto=format&fit=crop" alt="Music Video Production" />
                  <div className="card-overlay"></div>
                </div>
                <div className="card-info">
                  <p className="card-role">Lighting & Color Grade</p>
                  <h2>Neon Dreams <br />Music Video</h2>
                </div>
              </div>
            </div>

            <div className="scroll-card">
              <div className="card-inner">
                <div className="card-media">
                  <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" alt="Wedding Film" />
                  <div className="card-overlay"></div>
                </div>
                <div className="card-info">
                  <p className="card-role">Event Cinematography</p>
                  <h2>L&A Romance <br />Wedding Film</h2>
                </div>
              </div>
            </div>

            <div className="scroll-card end-card">
              <div className="card-inner cta-inner">
                <h2 className="massive-text">Full <br />Archive</h2>
                <button className="cta-primary magnetic-btn view-all-btn" onMouseMove={(e) => handleMagneticMove(e, e.currentTarget)} onMouseLeave={(e) => handleMagneticLeave(e.currentTarget)}>
                  <span className="btn-text">Explore All Work</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* --- SECTION 3: SERVICES KINETIC SCROLL --- */}
        <section className="services-section" ref={servicesRef} id="services">
          <div className="services-header">
            <p>Our Offerings</p>
            <h3>Studio Capabilities</h3>
          </div>
          <div className="services-container">

            <div className="services-list">
              <div className="service-item" onMouseEnter={() => handleServiceHover('v-commercial')}>
                <span className="service-num">01</span>
                <div>
                  <h2 className="service-title">Commercial Film</h2>
                </div>
              </div>
              <div className="service-item" onMouseEnter={() => handleServiceHover('v-music')}>
                <span className="service-num">02</span>
                <div>
                  <h2 className="service-title">Music Videos</h2>
                </div>
              </div>
              <div className="service-item" onMouseEnter={() => handleServiceHover('v-wedding')}>
                <span className="service-num">03</span>
                <div>
                  <h2 className="service-title">Luxury Weddings</h2>
                </div>
              </div>
              <div className="service-item" onMouseEnter={() => handleServiceHover('v-brand')}>
                <span className="service-num">04</span>
                <div>
                  <h2 className="service-title">Brand Identity</h2>
                </div>
              </div>
            </div>

            <div className="media-preview-container">
              <div className={`service-media-preview ${activeService === 'v-commercial' ? 'active' : ''}`}>
                <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop" alt="Commercial" />
              </div>
              <div className={`service-media-preview ${activeService === 'v-music' ? 'active' : ''}`}>
                <img src="https://images.unsplash.com/photo-1594957973877-339ff7bdfeb6?q=80&w=2012&auto=format&fit=crop" alt="Music Video" />
              </div>
              <div className={`service-media-preview ${activeService === 'v-wedding' ? 'active' : ''}`}>
                <img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop" alt="Wedding" />
              </div>
              <div className={`service-media-preview ${activeService === 'v-brand' ? 'active' : ''}`}>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" alt="Brand Identity" />
              </div>
            </div>

          </div>
        </section>

        <div className="footer-spacer"></div>
      </div>

      {/* --- SECTION 4: REVEAL FOOTER --- */}
      <footer className="reveal-footer" id="contact" ref={footerRef}>
        <div className="footer-content">
          <div className="footer-top">
            <h2 className="footer-headline">Let's <br />Create.</h2>
          </div>
          <div className="footer-grid">
            <div className="footer-col" style={{ gridColumn: 'span 2' }}>
              <h4>Inquiries</h4>
              <a href="mailto:hello@mt_ent.studio" className="email-link">
                hello@mt_ent.studio
              </a>
            </div>
            <div className="footer-col">
              <h4>Socials</h4>
              <a href="https://instagram.com" className="footer-link">Instagram</a>
              <a href="https://vimeo.com" className="footer-link">Vimeo</a>
              <a href="https://youtube.com" className="footer-link">YouTube</a>
            </div>
            <div className="footer-col">
              <h4>Location</h4>
              <p>Melbourne<br />South-East, AUS<br />Available Worlwide</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 MT Entertainment. Visual Architecture.</p>
            <div className="small-logo">mt_ent_</div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
