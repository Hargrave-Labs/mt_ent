import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutMT.css';

gsap.registerPlugin(ScrollTrigger);

const AboutMT = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = gsap.utils.toArray('.about-statement .word');

            // Animation triggers once when the section enters the viewport
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%", // Triggers when the top of the section is 70% down the viewport
                    toggleActions: "play none none none" // Plays once, doesn't reverse or scrub
                }
            });

            // Reveal label
            tl.to('.about-label', {
                opacity: 1,
                y: -10,
                duration: 0.5,
                ease: "power2.out"
            }, 0);

            // Expand background glow
            tl.to('.about-glow', {
                scale: 1.5,
                opacity: 1,
                duration: 2,
                ease: "power1.inOut"
            }, 0);

            // Stagger reveal of the main statement words with a cool blur unfocus effect
            tl.to(words, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                stagger: 0.1,
                duration: 1.2,
                ease: "power3.out"
            }, 0.2);

            // Reveal details at the end
            tl.to('.about-details', {
                opacity: 1,
                y: -10,
                duration: 1,
                ease: "power2.out"
            }, "+=0.2");

            // Reveal SEO text block
            tl.to('.about-seo-text', {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            }, "-=0.5");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="about-section" ref={sectionRef} id="about">
            {/* Reusing the noise pattern from the hero for texture consistency */}
            <div className="bg-pattern" style={{ zIndex: 1, opacity: 0.8 }}></div>
            <div className="about-glow"></div>

            <div className="about-content">
                <p className="about-label">About MT Entertainment</p>
                <h2 className="about-statement" style={{ maxWidth: "1000px", margin: "0 auto" }}>
                    <span className="word">MT</span>
                    <span className="word">Entertainment</span>
                    <span className="word">is</span>
                    <span className="word">a</span>
                    <span className="word">premier</span>
                    <span className="word">production</span>
                    <span className="word">agency</span>
                    <span className="word">delivering</span>
                    <span className="word">high-end</span>
                    <span className="word"><i>Photography,</i></span>
                    <span className="word"><i>Videography,</i></span>
                    <span className="word"><i>Cinematography,</i></span>
                    <span className="word">and</span>
                    <span className="word"><i>Event</i></span>
                    <span className="word"><i>Media.</i></span>
                </h2>

                <div className="about-details">
                    <div className="detail-item">
                        <h4>Est.</h4>
                        <p>2023</p>
                    </div>
                    <div className="detail-item">
                        <h4>Location</h4>
                        <p>Global</p>
                    </div>
                    <div className="detail-item">
                        <h4>Focus</h4>
                        <p>High-End Production</p>
                    </div>
                </div>

                <div className="about-seo-text">
                    <p>
                        Established in 2023, <strong>MT Entertainment</strong> transcends traditional boundaries to create elite visual experiences for global brands. Our industry-leading team blends technical precision with artistic innovation to deliver comprehensive media solutions.
                    </p>
                    <ul className="seo-list">
                        <li><strong>Professional Photography:</strong> High-resolution commercial, editorial, and portrait imagery.</li>
                        <li><strong>Cinematic Videography:</strong> Engaging visual narratives tailored for digital and broadcast platforms.</li>
                        <li><strong>Event Media Coverage:</strong> State-of-the-art documentation for high-profile global events and activations.</li>
                    </ul>
                    <p>
                        Whether executing a bespoke commercial campaign or capturing a live event, MT Entertainment ensures your creative vision achieves maximum impact. Partner with us for unparalleled aesthetic excellence and production quality.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutMT;
