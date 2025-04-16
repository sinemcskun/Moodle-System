"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Tooltip from '@mui/material/Tooltip';
import { MoodleService } from '@/lib/moodle/service';
import { Course } from '@/types/moodle';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { 
  HomeIcon, 
  BookIcon, 
  UserIcon,
  CalendarIcon,
  FileTextIcon,
  BarChartIcon,
  MailIcon,
  FolderIcon
} from '@/components/ui/icons';

type CalendarDatePiece = Date | null;
type CalendarDate = CalendarDatePiece | [CalendarDatePiece, CalendarDatePiece];

type Etkinlik = {
  tarih: Date;
  baslik: string;
};

export default function CoursesPage() { // Fonksiyon adını CoursesPage olarak değiştirdim
  const router = useRouter();
  const [tarih, setTarih] = useState<CalendarDate>(new Date());
  const [dersler, setDersler] = useState<Course[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState('');

  useEffect(() => {
    const verileriGetir = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const kullaniciBilgileri = await MoodleService.getUserInfo(token);
        const kullaniciId = kullaniciBilgileri.userid || kullaniciBilgileri.id;
        
        if (!kullaniciId) throw new Error('Kullanıcı ID bulunamadı');

        const dersVerileri = await MoodleService.getCourses(token, kullaniciId);
        setDersler(Array.isArray(dersVerileri) ? dersVerileri : []);
      } catch (hata) {
        setHata('Dersler yüklenemedi');
        console.error(hata);
      } finally {
        setYukleniyor(false);
      }
    };
    
    verileriGetir();
  }, [router]);

  const etkinlikler: Etkinlik[] = [
    { tarih: new Date(2025, 3, 16), baslik: "Ödev: Güvenli Yazılım Geliştirme" },
    { tarih: new Date(2025, 3, 30), baslik: "Wireshark Laboratuvar Teslimi" },
    { tarih: new Date(2025, 4, 9), baslik: "ISG Sınavı" },
  ];

  const tarihDegistiginde = (deger: CalendarDate) => {
    setTarih(deger);
  };

  const takvimIcerik = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const etkinlik = etkinlikler.find(e => e.tarih.toDateString() === date.toDateString());
      return etkinlik ? (
        <Tooltip title={etkinlik.baslik} arrow>
          <div className="bg-red-500 w-2 h-2 rounded-full mx-auto mt-1" />
        </Tooltip>
      ) : null;
    }
    return null;
  };

  if (yukleniyor) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600" />
      </div>
    );
  }

  if (hata) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">{hata}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Üst Bilgi */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <img 
            src="/ogmer.png" 
            alt="Logo" 
            className="h-12 cursor-pointer" 
            onClick={() => router.push('/dashboard')}
          />
          <nav className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">
                <HomeIcon className="mr-2 h-4 w-4" /> Ana Sayfa
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/courses">
                <BookIcon className="mr-2 h-4 w-4" /> Derslerim
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/profile">
                <UserIcon className="mr-2 h-4 w-4" /> Profilim
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      
      {/* Ana İçerik */}
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Sütun - Dersler */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Derslerim ({dersler.length})</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dersler.map((ders) => (
                <Card 
                  key={ders.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => router.push(`/courses/${ders.id}`)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg truncate">{ders.fullname}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-2">
                      {ders.summary || 'Açıklama bulunmamaktadır'}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between text-sm text-gray-500">
                    <span>
                      {ders.startdate ? new Date(ders.startdate * 1000).toLocaleDateString() : 'Tarih yok'}
                    </span>
                    <span>{ders.progress || 0}% Tamamlandı</span>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {/* Etkinlikler */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Yaklaşan Etkinlikler</h2>
              <div className="space-y-4">
                {etkinlikler.map((etkinlik, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="bg-red-100 p-2 rounded-full">
                      <CalendarIcon className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{etkinlik.baslik}</h3>
                      <p className="text-sm text-gray-500">
                        {etkinlik.tarih.toLocaleDateString('tr-TR', { 
                          weekday: 'long', 
                          day: 'numeric', 
                          month: 'long' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sağ Sütun */}
          <div className="space-y-6">
            {/* Takvim */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Takvim</h2>
              <Calendar 
                onChange={tarihDegistiginde}
                value={tarih}
                tileContent={takvimIcerik}
                className="border-0 w-full"
              />
            </div>
            
            {/* Hızlı Erişim */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Hızlı Erişim</h2>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-24" onClick={() => router.push('/assignments')}>
                  <FileTextIcon className="h-6 w-6 mr-2" />
                  Ödevler
                </Button>
                <Button variant="outline" className="h-24" onClick={() => router.push('/grades')}>
                  <BarChartIcon className="h-6 w-6 mr-2" />
                  Notlar
                </Button>
                <Button variant="outline" className="h-24" onClick={() => router.push('/messages')}>
                  <MailIcon className="h-6 w-6 mr-2" />
                  Mesajlar
                </Button>
                <Button variant="outline" className="h-24" onClick={() => router.push('/resources')}>
                  <FolderIcon className="h-6 w-6 mr-2" />
                  Kaynaklar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}