import React from 'react';
import './Notes.css';

const NoteIcon = ({ type }) => (
  <svg className="note-icon" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
    {type === 'top' && <>
      <circle cx="22" cy="22" r="20" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="0.8" />
      <circle cx="22" cy="14" r="4" fill="rgba(201,168,76,0.3)" />
      <circle cx="14" cy="26" r="3" fill="rgba(201,168,76,0.2)" />
      <circle cx="30" cy="26" r="3" fill="rgba(201,168,76,0.2)" />
      <path d="M22 18 L16 26 L28 26 Z" fill="rgba(201,168,76,0.15)" />
    </>}
    {type === 'heart' && <>
      <circle cx="22" cy="22" r="20" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="0.8" />
      <path d="M22 8 Q28 16 28 22 Q28 30 22 36 Q16 30 16 22 Q16 16 22 8 Z" fill="rgba(107,15,26,0.4)" />
      <circle cx="22" cy="22" r="5" fill="rgba(201,168,76,0.2)" />
    </>}
    {type === 'base' && <>
      <circle cx="22" cy="22" r="20" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="0.8" />
      <rect x="14" y="28" width="16" height="4" rx="1" fill="rgba(201,168,76,0.3)" />
      <rect x="17" y="22" width="10" height="6" rx="1" fill="rgba(201,168,76,0.2)" />
      <path d="M18 14 Q22 18 22 22 L14 22 Q14 18 18 14 Z" fill="rgba(201,168,76,0.15)" />
      <path d="M26 14 Q22 18 22 22 L30 22 Q30 18 26 14 Z" fill="rgba(201,168,76,0.1)" />
    </>}
  </svg>
);

const NoteCard = ({ type, label, notes, delay }) => {
  const mainNote = notes?.[0];
  const noteNames = notes?.map(n => n.name).join(' & ') || '';
  const noteDesc = mainNote?.description || '';

  return (
    <div className={`note-card reveal reveal-d${delay}`}>
      <NoteIcon type={type} />
      <div className="note-label">{label}</div>
      <div className="note-name">{noteNames || 'Coming Soon'}</div>
      <div className="note-desc">{noteDesc}</div>
    </div>
  );
};

const Notes = ({ product }) => (
  <section className="notes" id="notes">
    <div className="reveal">
      <div className="eyebrow" style={{ justifyContent: 'center' }}>Composition</div>
      <h2 className="notes-title">The Olfactory Pyramid</h2>
      <p className="notes-sub">A journey from first breath to lasting memory</p>
    </div>
    <div className="notes-grid">
      <NoteCard type="top" label="Top Notes" notes={product?.fragranceNotes?.top} delay={1} />
      <NoteCard type="heart" label="Heart Notes" notes={product?.fragranceNotes?.heart} delay={2} />
      <NoteCard type="base" label="Base Notes" notes={product?.fragranceNotes?.base} delay={3} />
    </div>
  </section>
);

export default Notes;
