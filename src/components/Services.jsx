import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../sanityClient';

const Services = () => {
    const [categoryImages, setCategoryImages] = useState({
        photography: null,
        videography: null,
        cinematography: null,
        'event-media': null
    });

    useEffect(() => {
        const fetchImages = async () => {
            try {
                // Fetch the single 'studioCapabilities' document
                const query = `*[_type == "studioCapabilities"][0] {
                    "photography": photographyImage.asset->url,
                    "photographyVideo": photographyVideo.asset->url,
                    "videography": videographyImage.asset->url,
                    "videographyVideo": videographyVideo.asset->url,
                    "cinematography": cinematographyImage.asset->url,
                    "cinematographyVideo": cinematographyVideo.asset->url,
                    "eventMedia": eventMediaImage.asset->url,
                    "eventMediaVideo": eventMediaVideo.asset->url
                }`;
                const data = await client.fetch(query);

                if (data) {
                    setCategoryImages(data);
                }
            } catch (error) {
                console.error("Error fetching studio capabilities images:", error);
            }
        };

        fetchImages();
    }, []);

    const renderMedia = (image, video, alt) => {
        if (video) {
            return (
                <video src={video} autoPlay loop muted playsInline className="service-card-img" />
            );
        }
        if (image) {
            return (
                <img src={image} alt={alt} className="service-card-img" />
            );
        }
        return null;
    };

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
                        {renderMedia(categoryImages.photography, categoryImages.photographyVideo, "Photography")}
                        <div className="card-content-layer">
                            <span className="modern-card-num">01 // PHOTOGRAPHY</span>
                        </div>
                        <div className="card-footer-content">
                            <h2 className="modern-card-title">Lens & Light</h2>
                        </div>
                    </Link>

                    {/* VIDEOGRAPHY CARD (Top Right) */}
                    <Link to="/works/videography" className="service-card modern-card videography-card">
                        {renderMedia(categoryImages.videography, categoryImages.videographyVideo, "Videography")}
                        <div className="card-content-layer">
                            <span className="modern-card-num">02 // VIDEOGRAPHY</span>
                            <h2 className="modern-card-title">Motion Capture</h2>
                        </div>
                    </Link>

                    {/* CINEMATOGRAPHY CARD (Bottom Right) */}
                    <Link to="/works/cinematography" className="service-card modern-card cinematography-card">
                        {renderMedia(categoryImages.cinematography, categoryImages.cinematographyVideo, "Cinematography")}
                        <div className="card-content-layer">
                            <span className="modern-card-num">03 // CINEMATOGRAPHY</span>
                            <h2 className="modern-card-title">Film & Narrative</h2>
                        </div>
                    </Link>

                    {/* EVENT MEDIA CARD (Wide Footer Card) */}
                    <Link to="/works/event-media" className="service-card modern-card event-media-card">
                        {renderMedia(categoryImages.eventMedia, categoryImages.eventMediaVideo, "Event Media")}
                        <div className="card-content-layer horizontal-content">
                            <span className="modern-card-num">04 // EVENT MEDIA</span>
                            <h2 className="modern-card-title">Live Coverage</h2>
                        </div>
                    </Link>

                </div>
            </div>
        </section>
    );
};

export default Services;
