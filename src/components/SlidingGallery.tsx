'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

import ThumbnailCard from './ThumbnailCard';
import { boxDefault } from '../themes';

interface CardItem {
  title: string;
  img: string; // should be a public path like "/images/foo.png"
  url: string;
}

const SlidingGallery: React.FC = () => {
  const [cards, setCards] = useState<CardItem[]>([]);

  useEffect(() => {
    fetch('/stuff.json')
      .then((res) => res.json())
      .then((data: CardItem[]) => setCards(data))
      .catch((err) => console.error('Failed to load stuff.json', err));
  }, []);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1000px',
        padding: '2em clamp(1em, 5vw, 4em)',
        boxSizing: 'border-box',
        margin: '0 auto',
        ...boxDefault,
      }}
    >
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1.5}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        speed={600}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide
            key={index}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <ThumbnailCard
              imageSrc={card.img}
              pageName={card.title}
              url={card.url}
              height="10em"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlidingGallery;
