import React, { useEffect, useState } from 'react';
import api from '../api';
import useReveal from '../hooks/useReveal';
import Hero from '../components/Hero/Hero';
import Story from '../components/Story/Story';
import Notes from '../components/Notes/Notes';
import Gallery from '../components/Gallery/Gallery';
import ProductSection from '../components/Product/ProductSection';
import Craft from '../components/Craft/Craft';

const Home = () => {
  const [product, setProduct] = useState(null);
  useReveal();

  useEffect(() => {
    api.get('/products/featured')
      .then(r => setProduct(r.data))
      .catch(() => setProduct(null));
  }, []);

  return (
    <>
      <Hero product={product} />
      <Story product={product} />
      <Notes product={product} />
      <Gallery />
      <ProductSection product={product} />
      <Craft />
    </>
  );
};

export default Home;
