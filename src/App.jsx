import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.5, // Slightly longer duration for a highly luxurious feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 2. Hero "Lights On" Animation - Refined for Elegance
    // Set initial hidden states via GSAP (not CSS) so cleanup reverts to visible
    const ctx = gsap.context(() => {
      gsap.set('.header', { opacity: 0, y: 20 });
      gsap.set('.headline .word', { y: '115%' });
      gsap.set('.bio-grid', { opacity: 0, y: 20 });
      gsap.set('.cta-group', { opacity: 0, y: 20 });
    }, containerRef);

    // Swapped "back.out" bounces for sharp, authoritative "expo.out" and "power3.out"
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tlRef.current = tl;

    tl.to('.studio-light', { opacity: 0.15, duration: 0.6, ease: "power2.inOut" });

    // Tighter, more realistic LED flicker
    const flickerTl = gsap.timeline();
    flickerTl.to('.left .diffuser-screen', { fill: '#ffffff', duration: 0.03 })
      .to('.left .diffuser-screen', { fill: '#050505', duration: 0.05 })
      .to('.left .diffuser-screen', { fill: '#ffffff', duration: 0.04 })
      .to('.left .diffuser-screen', { fill: '#050505', duration: 0.08 })
      .to('.left .diffuser-screen', { fill: '#ffffff', duration: 0.1 });

    flickerTl.to('.right .diffuser-screen', { fill: '#ffffff', duration: 0.04 }, 0.06)
      .to('.right .diffuser-screen', { fill: '#050505', duration: 0.06 }, ">")
      .to('.right .diffuser-screen', { fill: '#ffffff', duration: 0.1 }, "+=0.03");

    tl.add(flickerTl, "+=0.1");
    tl.to('.light-beam', { opacity: 0.4, duration: 0.3, ease: "power2.out" }, "-=0.1");

    // The Reveal: Wipes to elegant off-white
    tl.to('.light-wipe', { scale: 3.5, opacity: 1, duration: 1.4, ease: "expo.out" }, "-=0.2")
      .to('.main-app', { backgroundColor: 'var(--bg-light)', duration: 0.1 }, "-=0.2")
      .to('.light-theme-bg', { opacity: 1, duration: 0.1 }, "-=0.2")
      .to('.light-wipe', { opacity: 0, duration: 1, ease: "power2.out" }, ">")
      .to('.light-beam', { opacity: 0.03, mixBlendMode: 'normal', duration: 1 }, "-=1");

    // Refined Typography Stagger
    tl.to('.header', { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" }, "-=1.6")
      .to('.headline .word', { y: '0%', stagger: 0.05, duration: 1.2, ease: "expo.out" }, "-=1.4")
      .to('.bio-grid', { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" }, "-=1.3")
      .to('.cta-group', { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" }, "-=1.4");

    // 3. Horizontal Scroll Pinning Logic
    if (horizontalRef.current) {
      const horizontalSection = horizontalRef.current;
      const scrollCards = gsap.utils.toArray('.scroll-card');

      gsap.to(scrollCards, {
        xPercent: -100 * (scrollCards.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSection,
          pin: true,
          scrub: 1,
          snap: 1 / (scrollCards.length - 1),
          start: "top top",
          end: "+=3000"
        }
      });
    }

    // 4. Parallax Hero Interactions (toned down multipliers for realism)
    const handleMouseMove = (e) => {
      if (window.innerWidth > 768) {
        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;

        gsap.to('.studio-light.left', { rotation: -35 + (mouseX * 4), x: mouseX * 20, y: mouseY * 15, duration: 2, ease: "power3.out" });
        gsap.to('.studio-light.right', { rotation: 35 + (mouseX * -4), x: mouseX * -20, y: mouseY * 10, duration: 2, ease: "power3.out" });
        gsap.to('.bg-pattern', { x: mouseX * -15, y: mouseY * -15, duration: 2, ease: "power3.out" });
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

  // Magnetic bounds reduced to feel stiff & premium, not loose/bouncy
  const handleMagneticMove = (e, target) => {
    const rect = target.getBoundingClientRect();
    const x = (e.clientX - rect.left) - (rect.width / 2);
    const y = (e.clientY - rect.top) - (rect.height / 2);

    gsap.to(target, { x: x * 0.15, y: y * 0.15, duration: 0.6, ease: "power3.out" });
    const text = target.querySelector('.btn-text');
    if (text) gsap.to(text, { x: x * 0.08, y: y * 0.08, duration: 0.6, ease: "power3.out" });
  };

  const handleMagneticLeave = (target) => {
    gsap.to(target, { x: 0, y: 0, duration: 0.8, ease: "expo.out" });
    const text = target.querySelector('.btn-text');
    if (text) gsap.to(text, { x: 0, y: 0, duration: 0.8, ease: "expo.out" });
  };

  const handleServiceHover = (e, videoId) => {
    gsap.to('.service-video-preview', { opacity: 0, duration: 0.4 });
    gsap.to(`#${videoId}`, { opacity: 1, duration: 0.5, ease: "power2.out" });
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
            {/* Minimalist sleek LED Panel Light Vectors */}
            <div className="studio-light left">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <g className="fixture">
                  <rect x="98" y="0" width="4" height="60" fill="#151515" />
                  <rect x="30" y="60" width="140" height="15" rx="2" fill="#0d0d0d" />
                  <path d="M 25 75 L 175 75 L 185 95 L 15 95 Z" fill="#0a0a0a" />
                  <path d="M 27 77 L 173 77 L 181 93 L 19 93 Z" className="diffuser-screen" fill="#050505" />
                  {/* Subtle barn door lines for realism */}
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
                <svg className="logo-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="48" fill="#000" />
                  <text x="50" y="72" fill="#fff" fontFamily="'Playfair Display', serif" fontSize="65" textAnchor="middle" fontStyle="italic">M</text>
                  <line x1="18" y1="78" x2="82" y2="25" stroke="#fff" strokeWidth="2.5" />
                </svg>
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
                  <span className="line"><span className="word">Illuminating</span></span>
                  <span className="line"><span className="word playfair">Your</span> <span className="word">Vision.</span></span>
                </h1>

                {/* Clean, editorial bio grid entirely replacing emojis */}
                <div className="bio-grid">
                  <div className="bio-item"><Film /><span>Cinematic Media</span></div>
                  <div className="bio-item"><MapPin /><span>Melb South-East</span></div>
                  <div className="bio-item"><Camera /><span>Sony A7 III</span></div>
                  <div className="bio-item"><Eye /><span>View Latest Work</span></div>
                </div>

                <div className="cta-group" id="cta-group">
                  <button className="cta-primary magnetic-btn" onMouseMove={(e) => handleMagneticMove(e, e.currentTarget)} onMouseLeave={(e) => handleMagneticLeave(e.currentTarget)}>
                    <span className="btn-text">View the Reel</span>
                  </button>
                  <button className="cta-secondary magnetic-btn" onMouseMove={(e) => handleMagneticMove(e, e.currentTarget)} onMouseLeave={(e) => handleMagneticLeave(e.currentTarget)}>
                    <span className="btn-text">Work with Milan</span>
                  </button>
                </div>
              </div>
            </div>
          </main>
        </section>

        {/* --- SECTION 2: HORIZONTAL REEL --- */}
        <section className="horizontal-section" ref={horizontalRef} id="portfolio">
          <div className="scroll-wrapper">

            <div className="scroll-card">
              <div className="card-inner">
                <div className="card-media mock-media gradient-1">
                  {/* Monochromatic placeholders look more sophisticated */}
                  <span className="mock-label">Team Spicemix</span>
                </div>
                <div className="card-info">
                  <p className="card-role">Cinematography & Editing</p>
                  <h2>M&M Feature</h2>
                </div>
              </div>
            </div>

            <div className="scroll-card">
              <div className="card-inner">
                <div className="card-media mock-media gradient-2">
                  <span className="mock-label">Kazhugu Showcase</span>
                </div>
                <div className="card-info">
                  <p className="card-role">VFX & Composition</p>
                  <h2>The Fire Reveal</h2>
                </div>
              </div>
            </div>

            <div className="scroll-card">
              <div className="card-inner">
                <div className="card-media mock-media gradient-3">
                  <span className="mock-label">Wedding & Portraiture</span>
                </div>
                <div className="card-info">
                  <p className="card-role">Photography Suite</p>
                  <h2>Color & Emotion</h2>
                </div>
              </div>
            </div>

            <div className="scroll-card end-card">
              <div className="card-inner cta-inner">
                <h2 className="massive-text">See the <br />Archive</h2>
                <button className="cta-primary magnetic-btn view-all-btn" onMouseMove={(e) => handleMagneticMove(e, e.currentTarget)} onMouseLeave={(e) => handleMagneticLeave(e.currentTarget)}>
                  <span className="btn-text">Explore All Work</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* --- SECTION 3: SERVICES KINETIC TYPOGRAPHY --- */}
        <section className="services-section" ref={servicesRef} id="services">
          <div className="services-container">

            <div className="media-preview-container">
              <div id="v-commercial" className="service-video-preview gradient-1"></div>
              <div id="v-music" className="service-video-preview gradient-2"></div>
              <div id="v-wedding" className="service-video-preview gradient-3"></div>
              <div id="v-brand" className="service-video-preview gradient-1"></div>
            </div>

            <div className="services-list">
              <div className="service-item" onMouseEnter={(e) => handleServiceHover(e, 'v-commercial')} onMouseLeave={() => gsap.to('.service-video-preview', { opacity: 0 })}>
                <span className="service-num">01</span>
                <h2 className="service-title">Commercial Film</h2>
              </div>
              <div className="service-item" onMouseEnter={(e) => handleServiceHover(e, 'v-music')} onMouseLeave={() => gsap.to('.service-video-preview', { opacity: 0 })}>
                <span className="service-num">02</span>
                <h2 className="service-title">Music Videos</h2>
              </div>
              <div className="service-item" onMouseEnter={(e) => handleServiceHover(e, 'v-wedding')} onMouseLeave={() => gsap.to('.service-video-preview', { opacity: 0 })}>
                <span className="service-num">03</span>
                <h2 className="service-title">Weddings</h2>
              </div>
              <div className="service-item" onMouseEnter={(e) => handleServiceHover(e, 'v-brand')} onMouseLeave={() => gsap.to('.service-video-preview', { opacity: 0 })}>
                <span className="service-num">04</span>
                <h2 className="service-title">Brand Identity</h2>
              </div>
            </div>

          </div>
        </section>

        <div className="footer-spacer"></div>
      </div>

      {/* --- SECTION 4: REVEAL FOOTER --- */}
      <footer className="reveal-footer" id="contact" ref={footerRef}>
        <div className="footer-content">
          <h2 className="footer-headline">Let's Create.</h2>
          <div className="footer-grid">
            <div className="footer-col">
              <h4>Inquiries</h4>
              <a href="mailto:contact@milan.com" className="email-link">
                contact@milan.com
              </a>
            </div>
            <div className="footer-col">
              <h4>Socials</h4>
              <a href="#" className="footer-link">Instagram</a>
              <a href="#" className="footer-link">YouTube</a>
              <a href="#" className="footer-link">TikTok</a>
            </div>
            <div className="footer-col">
              <h4>Location</h4>
              <p>Melbourne<br />South-East, AUS</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 MT Entertainment. All rights reserved.</p>
            <div className="small-logo">mt_ent_</div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
