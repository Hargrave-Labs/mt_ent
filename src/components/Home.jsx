import React from 'react';
import useSmoothScroll from '../hooks/useSmoothScroll';
import Hero from './Hero';
import AboutMT from './AboutMT';
import HorizontalReel from './HorizontalReel';
import Services from './Services';

const Home = () => {
    useSmoothScroll();

    return (
        <div className="home-content" style={{ backgroundColor: 'var(--bg-dark)', marginBottom: '80vh', position: 'relative', zIndex: 10 }}>
            <Hero />
            <AboutMT />
            <HorizontalReel />
            <Services />
        </div>
    );
};

export default Home;
