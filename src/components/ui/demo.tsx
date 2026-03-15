'use client';

import { useEffect } from 'react';
import LuxuryScrollVideo from './luxury-scroll-video';
import { urlFor } from '../../context/GalleryCacheContext';
import { getYouTubeThumbnail } from '../../lib/utils';

const Demo = ({ items }: { items?: any[] }) => {
  useEffect(() => {
    // Apply CSS Scroll Snapping globally when this component mounts
    document.documentElement.classList.add('snap-y', 'snap-mandatory');
    return () => {
      document.documentElement.classList.remove('snap-y', 'snap-mandatory');
    };
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <div className='flex flex-col w-full bg-black'>
      {items.map((item, index) => {
        const isVideo = item.mediaType === 'video' && (item.video?.asset?.url || item.youtubeUrl);
        const imageSource = isVideo ? item.videoThumbnail : item.image;
        
        let bgImageSrc = 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop';
        
        if (imageSource?.asset?.url) {
          bgImageSrc = urlFor(imageSource).width(1920).auto('format').url();
        } else if (isVideo && item.youtubeUrl) {
          const ytThumb = getYouTubeThumbnail(item.youtubeUrl);
          if (ytThumb) bgImageSrc = ytThumb;
        }
          
        const mediaSrc = isVideo ? (item.youtubeUrl || item.video?.asset?.url) : bgImageSrc;
        const posterSrc = isVideo && (imageSource?.asset?.url || (isVideo && item.youtubeUrl)) ? bgImageSrc : undefined;

        if (!mediaSrc && !bgImageSrc) return null;

        return (
            <LuxuryScrollVideo
                key={item._id || `cin-item-${index}`}
                mediaType={isVideo ? 'video' : 'image'}
                mediaSrc={mediaSrc}
                posterSrc={posterSrc}
                bgImageSrc={bgImageSrc}
                title={item.title || `Production Reel ${index + 1}`}
                label="Cinematography Works"
                scrollToExpand=""
            />
        );
      })}
    </div>
  );
};

export default Demo;
