const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tagline: { type: String },
    description: { type: String, required: true },
    story: { type: String },
    price: { type: Number, required: true },
    currency: { type: String, default: '₹' },
    volume: { type: String, default: '100 ml' },
    concentration: { type: String, default: 'Eau de Parfum' },
    edition: { type: String, default: 'Limited' },
    countInStock: { type: Number, required: true, default: 0 },
    images: [{ type: String }],
    fragranceNotes: {
      top: [{ name: String, description: String }],
      heart: [{ name: String, description: String }],
      base: [{ name: String, description: String }],
    },
    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
