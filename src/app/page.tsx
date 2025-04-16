"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Swiper CSS'leri
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  // Kullanıcı geri dönüşleri
  const testimonials = [
    {
      id: 1,
      quote: "Bu platform sayesinde kariyerimde büyük ilerleme kaydettim!",
      author: "Ayşe K., Öğrenci"
    },
    {
      id: 2,
      quote: "Eğitmenlerin kalitesi ve içerik zenginliği mükemmel.",
      author: "Mehmet T., Yazılım Mühendisi"
    },
    {
      id: 3,
      quote: "Kullanıcı dostu arayüzü ile öğrenmek çok keyifli.",
      author: "Zeynep A., Tasarımcı"
    },
    {
      id: 4,
      quote: "Canlı dersler ve interaktif içerikler çok faydalı.",
      author: "Deniz Y., Developer"
    },
    {
      id: 5,
      quote: "Uygun fiyata kaliteli eğitim sunuyorlar.",
      author: "Cem B., Öğrenci"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b p-4 flex justify-between items-center">
        <a href="/" className="hover:opacity-80 transition-opacity">
          <Image 
            src="/ogmer.png" 
            alt="Site Logosu" 
            width={120}
            height={120}
            priority
          />
        </a>
        <Button 
          onClick={handleLoginClick}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Giriş Yap
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow px-4 text-center">
        <div className="w-full max-w-6xl mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            AYBÜ ÖĞMER Eğitim Platformuna Hoş Geldiniz
          </h1>
          <p className="text-gray-600 mb-8">
            Sisteme giriş yapmak için lütfen butona tıklayın
          </p>
          <Button 
            onClick={handleLoginClick}
            size="lg"
            className="bg-red-600 hover:bg-red-700 mb-12"
          >
            Giriş Yap
          </Button>

          {/* Kullanıcı Geri Dönüşleri - Swiper Slider */}
          <div className="mt-8 w-full px-2">
            <h2 className="text-xl font-semibold mb-6 text-gray-700">Kullanıcılarımız Ne Diyor?</h2>
            
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              pagination={{ 
                clickable: true,
                dynamicBullets: true
              }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              loop={true}
              className="relative"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <Card className="p-6 bg-white shadow-md hover:shadow-lg transition-all h-full mx-2 hover:scale-[1.02]">
                    <CardContent className="p-0 flex flex-col h-full">
                      <p className="text-gray-600 italic mb-4 text-left text-lg">"{testimonial.quote}"</p>
                      <p className="text-gray-500 font-medium mt-auto text-right">- {testimonial.author}</p>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}

              {/* Özel Navigasyon Butonları */}
              <div className="swiper-button-next !text-red-600 after:!text-xl"></div>
              <div className="swiper-button-prev !text-red-600 after:!text-xl"></div>
            </Swiper>
          </div>
        </div>
      </main>
    </div>
  );
}