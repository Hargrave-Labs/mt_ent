import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
    return (
        <section className="services-section" id="services">
            <div className="services-header">
                <p>Our Offerings</p>
                <h3>Studio Capabilities</h3>
            </div>

            <div className="services-container bento-layout">
                <div className="services-bento-grid modern-asymmetric-grid">

                    {/* PHOTOGRAPHY CARD (Main Hero Card) */}
                    <Link to="/works/photography" className="service-card modern-card photography-card">
                        <div className="card-watermark">01</div>
                        <div className="card-content-layer">
                            <span className="modern-card-num">01 // PHOTOGRAPHY</span>
                        </div>
                        <div className="card-geometry-layer">
                            <div className="geometry-background-noise"></div>
                            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="geometry-svg">
                                <circle cx="100" cy="100" r="90" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                                <circle cx="100" cy="100" r="70" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="4 4" className="spin-slow" />
                                <circle cx="100" cy="100" r="30" stroke="rgba(255,255,255,0.6)" strokeWidth="2" className="pulse-slow" />
                                <path d="M 100 10 L 100 30 M 100 170 L 100 190 M 10 100 L 30 100 M 170 100 L 190 100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                                <path d="M 36.36 36.36 L 50.5 50.5 M 163.64 163.64 L 149.5 149.5 M 36.36 163.64 L 50.5 149.5 M 163.64 36.36 L 149.5 50.5" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                <g className="aperture-blades" stroke="rgba(255,255,255,0.3)" strokeWidth="1" opacity="0.7">
                                    <line x1="100" y1="50" x2="135" y2="100" />
                                    <line x1="135" y1="100" x2="100" y2="150" />
                                    <line x1="100" y1="150" x2="65" y2="100" />
                                    <line x1="65" y1="100" x2="100" y2="50" />
                                </g>
                            </svg>
                        </div>
                        <div className="card-footer-content">
                            <h2 className="modern-card-title">Lens & Light</h2>
                        </div>
                    </Link>

                    {/* VIDEOGRAPHY CARD (Top Right) */}
                    <Link to="/works/videography" className="service-card modern-card videography-card">
                        <div className="card-watermark">02</div>
                        <div className="card-content-layer">
                            <span className="modern-card-num">02 // VIDEOGRAPHY</span>
                            <h2 className="modern-card-title">Motion Capture</h2>
                        </div>
                        <div className="card-geometry-layer">
                            <div className="geometry-background-noise"></div>
                            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="geometry-svg">
                                <rect x="20" y="80" width="160" height="40" rx="4" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                                <g className="waveform-bars" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round">
                                    <line x1="30" y1="95" x2="30" y2="105" />
                                    <line x1="45" y1="88" x2="45" y2="112" />
                                    <line x1="60" y1="85" x2="60" y2="115" />
                                    <line x1="75" y1="92" x2="75" y2="108" />
                                    <line x1="90" y1="82" x2="90" y2="118" />
                                    <line x1="105" y1="90" x2="105" y2="110" />
                                    <line x1="120" y1="86" x2="120" y2="114" />
                                    <line x1="135" y1="95" x2="135" y2="105" />
                                    <line x1="150" y1="92" x2="150" y2="108" />
                                    <line x1="165" y1="96" x2="165" y2="104" />
                                </g>
                                <line x1="50" y1="60" x2="50" y2="140" stroke="var(--accent)" strokeWidth="2" className="scan-line" />
                                <polygon points="45,60 55,60 50,70" fill="var(--accent)" className="scan-head" />
                            </svg>
                        </div>
                    </Link>

                    {/* CINEMATOGRAPHY CARD (Bottom Right) */}
                    <Link to="/works/cinematography" className="service-card modern-card cinematography-card">
                        <div className="card-watermark">03</div>
                        <div className="card-content-layer">
                            <span className="modern-card-num">03 // CINEMATOGRAPHY</span>
                            <h2 className="modern-card-title">Film & Narrative</h2>
                        </div>
                        <div className="card-geometry-layer">
                            <div className="geometry-background-noise"></div>
                            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="geometry-svg">
                                <g className="film-strip-rotate">
                                    <rect x="50" y="20" width="100" height="160" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="rgba(0,0,0,0.1)" />
                                    <g fill="rgba(255,255,255,0.15)">
                                        <rect x="55" y="30" width="6" height="10" />
                                        <rect x="55" y="50" width="6" height="10" />
                                        <rect x="55" y="70" width="6" height="10" />
                                        <rect x="55" y="90" width="6" height="10" />
                                        <rect x="55" y="110" width="6" height="10" />
                                        <rect x="55" y="130" width="6" height="10" />
                                        <rect x="55" y="150" width="6" height="10" />
                                    </g>
                                    <g fill="rgba(255,255,255,0.15)">
                                        <rect x="139" y="30" width="6" height="10" />
                                        <rect x="139" y="50" width="6" height="10" />
                                        <rect x="139" y="70" width="6" height="10" />
                                        <rect x="139" y="90" width="6" height="10" />
                                        <rect x="139" y="110" width="6" height="10" />
                                        <rect x="139" y="130" width="6" height="10" />
                                        <rect x="139" y="150" width="6" height="10" />
                                    </g>
                                    <circle cx="100" cy="100" r="15" stroke="var(--accent)" strokeWidth="1" />
                                    <rect x="85" y="85" width="30" height="30" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" transform="rotate(45 100 100)" />
                                </g>
                            </svg>
                        </div>
                    </Link>

                    {/* EVENT MEDIA CARD (Wide Footer Card) */}
                    <Link to="/works/event-media" className="service-card modern-card event-media-card">
                        <div className="card-watermark">04</div>
                        <div className="card-content-layer horizontal-content">
                            <span className="modern-card-num">04 // EVENT MEDIA</span>
                            <h2 className="modern-card-title">Live Coverage</h2>
                        </div>
                        <div className="card-geometry-layer">
                            <div className="geometry-background-noise"></div>
                            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="geometry-svg">
                                <g className="network-nodes">
                                    <g stroke="rgba(255,255,255,0.1)" strokeWidth="1" className="network-lines">
                                        <line x1="100" y1="100" x2="50" y2="60" />
                                        <line x1="100" y1="100" x2="150" y2="50" />
                                        <line x1="100" y1="100" x2="160" y2="130" />
                                        <line x1="100" y1="100" x2="60" y2="150" />
                                        <line x1="50" y1="60" x2="80" y2="30" />
                                        <line x1="150" y1="50" x2="180" y2="80" />
                                        <line x1="160" y1="130" x2="130" y2="170" />
                                        <line x1="60" y1="150" x2="30" y2="120" />
                                    </g>
                                    <circle cx="100" cy="100" r="6" fill="var(--accent)" className="pulse-fast" />
                                    <g fill="rgba(255,255,255,0.6)" className="satellite-nodes">
                                        <circle cx="50" cy="60" r="3" />
                                        <circle cx="150" cy="50" r="4" />
                                        <circle cx="160" cy="130" r="3" />
                                        <circle cx="60" cy="150" r="4" />
                                        <circle cx="80" cy="30" r="2" />
                                        <circle cx="180" cy="80" r="2" />
                                        <circle cx="130" cy="170" r="2" />
                                        <circle cx="30" cy="120" r="2" />
                                    </g>
                                    <circle cx="100" cy="100" r="30" stroke="rgba(255,255,255,0.05)" strokeWidth="1" className="expand-ring-1" />
                                    <circle cx="100" cy="100" r="60" stroke="rgba(255,255,255,0.05)" strokeWidth="1" className="expand-ring-2" />
                                    <circle cx="100" cy="100" r="90" stroke="rgba(255,255,255,0.05)" strokeWidth="1" className="expand-ring-3" />
                                </g>
                            </svg>
                        </div>
                    </Link>

                </div>
            </div>
        </section>
    );
};

export default Services;
