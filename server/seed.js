require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');

const connectDB = require('./config/db');

const seedData = async () => {
  await connectDB();

  await Product.deleteMany({});
  await User.deleteMany({});

  // Admin user
  await User.create({
    name: 'Solehex Admin',
    email: 'admin@solehex.com',
    password: 'admin123',
    isAdmin: true,
  });

  // Seed products
  await Product.insertMany([
    {
      name: 'SOLEHEX SIGNATURE',
      slug: 'solehex-signature',
      tagline: 'Where darkness becomes desire',
      description:
        'A limited opus of darkness and light — SOLEHEX Signature is the distillation of our founding vision. Presented in hand-weighted crystal, sealed with 24-karat gold leaf, and wrapped in Italian black tissue.',
      story:
        'Born in the atelier of an obsession, SOLEHEX Signature is not a perfume — it is a philosophy distilled into liquid form. We spent three years studying the olfactory memory of evening light on ancient stone, of rain on volcanic earth, of time itself made breathable.',
      price: 18500,
      currency: '₹',
      volume: '100 ml',
      concentration: 'Eau de Parfum',
      edition: 'Limitée',
      countInStock: 50,
      isFeatured: true,
      images: ['/images/bottle-1.jpg', '/images/bottle-2.jpg', '/images/bottle-3.jpg'],
      fragranceNotes: {
        top: [
          { name: 'Bergamot', description: 'Sharp Calabrian bergamot electrified by the evening air.' },
          { name: 'Black Pepper', description: 'Indonesian black pepper — vivid, daring, impossibly bright.' },
        ],
        heart: [
          { name: 'Midnight Rose', description: 'Dark Turkish rose heavy with dew and shadow.' },
          { name: 'Oud', description: 'Rare Cambodian oud — the heart beats slowly, like a secret being told.' },
        ],
        base: [
          { name: 'Vetiver', description: 'Smoked Haitian vetiver anchoring the soul of the fragrance.' },
          { name: 'Ambergris', description: 'A wave of ambergris that lingers like a memory refusing to leave.' },
        ],
      },
    },
    {
      name: 'SOLEHEX NOIR',
      slug: 'solehex-noir',
      tagline: 'The scent of absolute night',
      description:
        'SOLEHEX Noir is a bold declaration of the infinite — deep, smoky, and unapologetically opulent. A fragrance for those who command rooms without speaking.',
      story:
        'Created at the intersection of Eastern mysticism and Western luxury, Noir draws from the darkest resins of the ancient Silk Road.',
      price: 22000,
      currency: '₹',
      volume: '100 ml',
      concentration: 'Extrait de Parfum',
      edition: 'Limitée',
      countInStock: 30,
      isFeatured: false,
      images: ['/images/noir-1.jpg'],
      fragranceNotes: {
        top: [{ name: 'Saffron', description: 'Precious saffron threads from Kashmir.' }],
        heart: [{ name: 'Black Oud', description: 'The richest, darkest oud in our collection.' }],
        base: [{ name: 'Dark Musk', description: 'An enveloping base of shadow musk and labdanum.' }],
      },
    },
  ]);

  console.log('✅ Database seeded successfully!');
  console.log('👤 Admin: admin@solehex.com / admin123');
  process.exit(0);
};

seedData().catch(err => { console.error(err); process.exit(1); });
