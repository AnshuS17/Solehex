import React from 'react';
import './Craft.css';

const STEPS = [
  { num: '01', title: 'Grasse Sourcing',    text: 'Every floral note traces its origin to sun-drenched Grasse fields, harvested at the precise hour of peak aromatic concentration.' },
  { num: '02', title: 'Cold Maceration',    text: 'Rare ingredients are cold-macerated for 18 months to preserve their molecular integrity — a patience most houses have abandoned.' },
  { num: '03', title: 'Crystal Vessel',     text: 'Each bottle is mouth-blown by Murano artisans, weighted to 340g, and engraved with the batch number in 18-karat gold.' },
  { num: '04', title: 'Hand Sealed',        text: 'A single silk thread closes every box. Cut it, and the fragrance is yours. We do not offer returns on opened souls.' },
];

const Craft = () => (
  <section className="craft">
    <h2 className="craft-heading reveal">The Art of Making</h2>
    <div className="craft-grid">
      {STEPS.map((s, i) => (
        <div key={s.num} className={`craft-item reveal reveal-d${i + 1}`}>
          <div className="craft-num">{s.num}</div>
          <div className="craft-item-title">{s.title}</div>
          <div className="craft-item-text">{s.text}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Craft;
