# SOLEHEX — Luxury Perfume MERN App

A full-stack luxury perfume e-commerce application built with MongoDB, Express, React, and Node.js.

---

## 🗂 Project Structure

```
solehex/
├── package.json              ← root (concurrent dev scripts)
├── server/
│   ├── index.js              ← Express entry point
│   ├── seed.js               ← DB seed script
│   ├── .env.example          ← Copy to .env and fill in values
│   ├── config/
│   │   └── db.js             ← MongoDB connection
│   ├── models/
│   │   ├── Product.js
│   │   ├── User.js
│   │   └── Order.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── shop.js           ← cart + orders
│   └── middleware/
│       └── auth.js           ← JWT protect + admin
└── client/
    ├── public/index.html
    └── src/
        ├── App.jsx            ← Router + layout
        ├── index.js
        ├── index.css          ← Global luxury design tokens
        ├── api.js             ← Axios instance (auto-attaches JWT)
        ├── context/
        │   └── AppContext.jsx ← Auth + Cart global state
        ├── hooks/
        │   └── useReveal.js   ← Scroll reveal animation hook
        ├── pages/
        │   ├── Home.jsx       ← Landing page (hero, story, notes, gallery, CTA)
        │   ├── Shop.jsx       ← All products grid
        │   ├── Login.jsx      ← Login / Register
        │   └── Admin.jsx      ← Admin: manage products & orders
        └── components/
            ├── Cursor.jsx
            ├── Toast.jsx
            ├── BottleSVG.jsx  ← Reusable animated SVG perfume bottle
            ├── Navbar/
            ├── Hero/
            ├── Story/
            ├── Notes/         ← Top / Heart / Base fragrance notes
            ├── Gallery/
            ├── Product/       ← Add to cart section
            ├── Craft/         ← "Art of Making" section
            ├── Cart/          ← Slide-in cart drawer
            └── Footer/
```

---

## 🚀 Quick Start

### 1. Install all dependencies
```bash
npm run install-all
```

### 2. Configure environment
```bash
cd server
cp .env.example .env
# Edit .env: set your MONGO_URI and JWT_SECRET
```

### 3. Seed the database
```bash
npm run seed
# Creates admin user + 2 products
# Admin: admin@solehex.com / admin123
```

### 4. Run dev servers (frontend + backend concurrently)
```bash
npm run dev
# React:  http://localhost:3000
# API:    http://localhost:5000
```

---

## 🔌 API Endpoints

| Method | Route                        | Auth     | Description            |
|--------|------------------------------|----------|------------------------|
| POST   | /api/auth/register           | —        | Register user          |
| POST   | /api/auth/login              | —        | Login                  |
| GET    | /api/auth/profile            | User     | Get profile + cart     |
| GET    | /api/products                | —        | All products           |
| GET    | /api/products/featured       | —        | Featured product       |
| GET    | /api/products/:slug          | —        | Single product         |
| POST   | /api/products                | Admin    | Create product         |
| PUT    | /api/products/:id            | Admin    | Update product         |
| DELETE | /api/products/:id            | Admin    | Delete product         |
| POST   | /api/products/:id/reviews    | User     | Add review             |
| GET    | /api/cart                    | User     | Get cart               |
| POST   | /api/cart                    | User     | Add to cart            |
| PUT    | /api/cart/:productId         | User     | Update quantity        |
| DELETE | /api/cart/:productId         | User     | Remove from cart       |
| POST   | /api/orders                  | User     | Place order            |
| GET    | /api/orders/mine             | User     | My orders              |
| GET    | /api/orders/all              | Admin    | All orders             |
| GET    | /api/orders/:id              | User     | Single order           |
| PUT    | /api/orders/:id/status       | Admin    | Update order status    |

---

## ✨ Features

- **Luxury UI** — Gold/cream/black/red palette, Cinzel + Cormorant Garamond typography, custom cursor, scroll animations
- **Hero** — Animated SVG perfume bottle, parallax, cinematic background
- **Fragrance Notes** — Top / Heart / Base pyramid cards pulled from DB
- **Product Gallery** — 4-edition horizontal scroll strip with hover expand
- **Cart Drawer** — Slide-in sidebar, quantity controls, persist via MongoDB
- **Auth** — JWT login/register, protected routes
- **Admin Panel** — Create/delete products, manage order statuses
- **Mobile Responsive** — Hamburger nav, stacked layouts, touch-friendly

---

## 🛠 Tech Stack

| Layer    | Tech                          |
|----------|-------------------------------|
| Frontend | React 18, React Router 6, Axios |
| Backend  | Node.js, Express 4            |
| Database | MongoDB, Mongoose             |
| Auth     | JWT, bcryptjs                 |
| Styling  | Custom CSS (no framework)     |
| Fonts    | Cinzel, Cormorant Garamond, Raleway (Google Fonts) |
