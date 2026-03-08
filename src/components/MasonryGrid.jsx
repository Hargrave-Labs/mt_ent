import React from 'react';
import { motion } from 'framer-motion';
import './MasonryGrid.css';

const MasonryGrid = ({ projects, onProjectClick }) => {
    return (
        <div className="masonry-grid">
            {projects.map((project, index) => {
                const isVideo = project.mediaType === 'video' && project.video?.asset?.url;
                const coverImage = project.galleryImages?.[0]?.asset?.url || project.images?.[0]?.asset?.url || project.image?.asset?.url;

                // Simple asymmetric height variation
                const isLarge = index % 4 === 0;
                const isMedium = index % 4 === 1 || index % 4 === 2;

                let sizeClass = 'grid-item-small';
                if (isLarge) sizeClass = 'grid-item-large';
                else if (isMedium) sizeClass = 'grid-item-medium';

                return (
                    <motion.div
                        key={project._id}
                        className={`masonry-item ${sizeClass}`}
                        layoutId={`project-${project._id}`}
                        onClick={() => onProjectClick(project)}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                        whileHover={{ scale: 0.98 }}
                    >
                        {isVideo ? (
                            <video src={project.video.asset.url} autoPlay muted loop playsInline className="masonry-image" />
                        ) : coverImage ? (
                            <img src={coverImage} alt={project.title} loading="lazy" className="masonry-image" />
                        ) : (
                            <div className="placeholder-image"></div>
                        )}
                        <div className="item-overlay">
                            <h3>{project.title}</h3>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default MasonryGrid;
