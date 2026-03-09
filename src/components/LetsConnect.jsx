import React, { useRef } from 'react';

// Custom wrapper for Magnetic buttons
const MagneticButton = ({ children, href, className }) => {
    const btnRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        // Calculate distance from center
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Move amount scaled down so it doesn't fly off screen
        btnRef.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    };

    const handleMouseLeave = () => {
        if (!btnRef.current) return;
        // Snap back to center
        btnRef.current.style.transform = `translate(0px, 0px)`;
    };

    return (
        <a
            href={href}
            target={href.startsWith('http') ? "_blank" : "_self"}
            rel="noopener noreferrer"
            ref={btnRef}
            className={`magnetic-wrapper ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transition: 'transform 0.1s ease-out' }}
        >
            {children}
        </a>
    );
};

const LetsConnect = () => {
    return (
        <section className="lets-connect-section">
            <div className="lets-connect-noise"></div>

            {/* Looping Marquee Background */}
            <div className="lets-connect-marquee">
                <div className="marquee-track">
                    <span>FILM • PHOTOGRAPHY • CREATIVE DIRECTION • EVENT MEDIA • </span>
                    <span>FILM • PHOTOGRAPHY • CREATIVE DIRECTION • EVENT MEDIA • </span>
                    <span>FILM • PHOTOGRAPHY • CREATIVE DIRECTION • EVENT MEDIA • </span>
                </div>
            </div>

            <div className="lets-connect-content">
                <p className="lets-connect-eyebrow">Bring your vision to life</p>
                <h2 className="lets-connect-headline">
                    <span className="serif-italic">Reach out </span>
                    to us.
                </h2>

                <div className="connect-btn-group">
                    <MagneticButton href="mailto:hello@mt_ent.studio" className="massive-email-btn">
                        <span className="btn-text">EMAIL US</span>
                        <div className="btn-hover-fill"></div>
                    </MagneticButton>

                    <MagneticButton href="https://www.instagram.com/mt_ent_/?hl=en" className="massive-email-btn outline-only">
                        <span className="btn-text">INSTAGRAM</span>
                        <div className="btn-hover-fill"></div>
                    </MagneticButton>
                </div>
            </div>

            <div className="lets-connect-grid-overlay">
                <div className="grid-line vertical line-1"></div>
                <div className="grid-line vertical line-2"></div>
                <div className="grid-line horizontal line-3"></div>
            </div>
        </section>
    );
};

export default LetsConnect;
