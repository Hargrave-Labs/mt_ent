import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Check if device supports touch
        setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    }, []);

    useEffect(() => {
        if (isTouchDevice) return;

        const cursor = cursorRef.current;

        // We use GSAP quickTo to make cursor follow mouse position incredibly performant
        const setX = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
        const setY = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

        let cursorVisible = false;

        const moveCursor = (e) => {
            // Offset by half the cursor size (20px width/height) to center it on mouse
            setX(e.clientX - 10);
            setY(e.clientY - 10);

            if (!cursorVisible) {
                cursorVisible = true;
                cursor.style.opacity = '1';
            }
        };

        window.addEventListener("mousemove", moveCursor);

        // Hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .magnetic-btn');

        const handleMouseEnter = () => {
            gsap.to(cursor, {
                scale: 2.5,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
                duration: 0.2
            });
        };

        const handleMouseLeave = () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: "#ffffff",
                border: "none",
                duration: 0.2
            });
        };

        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [isTouchDevice]);

    if (isTouchDevice) return null;

    return <div ref={cursorRef} className="custom-cursor"></div>;
};

export default CustomCursor;
