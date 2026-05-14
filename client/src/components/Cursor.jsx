import React, { useEffect, useRef } from 'react';

const Cursor = () => {
  const dot = useRef(null);
  const ring = useRef(null);
  let mx = -100, my = -100, rx = -100, ry = -100;

  useEffect(() => {
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', onMove);

    const onEnter = () => ring.current?.classList.add('hovering');
    const onLeave = () => ring.current?.classList.remove('hovering');
    const interactives = 'button, a, .note-card, .gallery-item, .shop-card, .craft-item, input, select, textarea';
    document.querySelectorAll(interactives).forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    let raf;
    const animate = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dot.current) { dot.current.style.left = mx + 'px'; dot.current.style.top = my + 'px'; }
      if (ring.current) { ring.current.style.left = rx + 'px'; ring.current.style.top = ry + 'px'; }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dot} />
      <div className="cursor-ring" ref={ring} />
    </>
  );
};

export default Cursor;
