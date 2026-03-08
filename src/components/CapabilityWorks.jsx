import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../sanityClient';
import MasonryGrid from './MasonryGrid';
import ProjectLightbox from './ProjectLightbox';
import CustomCursor from '../CustomCursor'; // To ensure cursor behaves properly
import './CapabilityWorks.css';

const CapabilityWorks = () => {
    const { capability } = useParams();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeProject, setActiveProject] = useState(null);

    useLayoutEffect(() => {
        // Use a small timeout to ensure Lenis smooth scroll destroy sequence doesn't intercept the native scroll jump
        const timeoutId = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 50);
        return () => clearTimeout(timeoutId);
    }, [capability]);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const categoryMapping = {
                    'photography': 'Photography',
                    'videography': 'Videography',
                    'cinematography': 'Cinematography',
                    'event-media': 'Event Media'
                };
                const categoryName = categoryMapping[capability] || capability.replace('-', ' ');

                // Fetch projects from Sanity, expand asset refs to get URLs
                const query = `*[_type == "project" && category == $categoryName] | order(order asc) {
                    _id,
                    title,
                    order,
                    category,
                    mediaType,
                    image { asset->{url} },
                    images[] { asset->{url} },
                    galleryImages[] { asset->{url} },
                    video { asset->{url} }
                }`;

                const data = await client.fetch(query, { categoryName });
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [capability]);

    return (
        <div className="capability-works-page">
            <div className="capability-works-content">
                <Link to="/" className="back-link">
                    &larr; Back to Studio
                </Link>

                <h1 className="capability-title">
                    {capability.replace('-', ' ')} Works
                </h1>

                {loading ? (
                    <div style={{ color: '#888', fontStyle: 'italic', height: '50vh', display: 'flex', alignItems: 'center' }}>Loading portfolio...</div>
                ) : projects.length > 0 ? (
                    <MasonryGrid projects={projects} onProjectClick={setActiveProject} />
                ) : (
                    <div style={{ color: '#555', height: '50vh', display: 'flex', alignItems: 'center' }}>No projects found for this capability.</div>
                )}

                {activeProject && (
                    <ProjectLightbox project={activeProject} onClose={() => setActiveProject(null)} />
                )}
            </div>
        </div>
    );
};

export default CapabilityWorks;
