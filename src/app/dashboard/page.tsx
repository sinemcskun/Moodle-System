"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { 
  HomeIcon, 
  BookIcon, 
  UserIcon,
  CalendarIcon,
  FileTextIcon,
  BarChartIcon,
  MailIcon,
  FolderIcon,
  CheckCircleIcon,
  ClockIcon,
  UsersIcon
} from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data - Gerçek veri bağlantısı yok
  const mockCourses = [
    {
      id: 1,
      name: "Bilgisayar Ağları",
      code: "BIL402",
      progress: 65,
      nextActivity: "12 Mayıs - Lab Uygulaması"
    },
    {
      id: 2,
      name: "Veri Yapıları",
      code: "BIL301",
      progress: 40,
      nextActivity: "15 Mayıs - Quiz"
    },
    {
      id: 3,
      name: "Web Programlama",
      code: "BIL352",
      progress: 80,
      nextActivity: "18 Mayıs - Proje Teslimi"
    }
  ];

  const mockNotifications = [
    { id: 1, text: "Bilgisayar Ağları dersi için yeni duyuru", time: "2 saat önce" },
    { id: 2, text: "Veri Yapıları ödevi için uzatma", time: "1 gün önce" },
    { id: 3, text: "Web Programlama sınav sonuçları yayınlandı", time: "3 gün önce" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Üst Bilgi */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-2 rounded-md">
              <BookIcon className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold">Eğitim Portalı</h1>
          </div>
          <nav className="flex gap-2">
            <Button 
              variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('dashboard')}
              asChild
            >
              <Link href="/dashboard">
                <HomeIcon className="mr-2 h-4 w-4" /> Ana Sayfa
              </Link>
            </Button>
            <Button 
              variant={activeTab === 'courses' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('courses')}
              asChild
            >
              <Link href="/courses">
                <BookIcon className="mr-2 h-4 w-4" /> Derslerim
              </Link>
            </Button>
            <Button 
              variant={activeTab === 'profile' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('profile')}
              asChild
            >
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
          {/* Sol Sütun */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hoş Geldiniz Kartı */}
            <Card>
              <CardHeader>
                <CardTitle>Hoş Geldiniz, Öğrenci!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Eğitim portalına erişiminiz aktif. Derslerinizi takip edebilir, ödevlerinizi yükleyebilir ve 
                  akademik bilgilerinizi görüntüleyebilirsiniz.
                </p>
              </CardContent>
            </Card>

            {/* Derslerim */}
            <h2 className="text-2xl font-bold">Devam Eden Derslerim</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{course.name}</CardTitle>
                    <p className="text-sm text-gray-500">{course.code}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      <span>{course.nextActivity}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Sağ Sütun */}
          <div className="space-y-6">
            {/* Bildirimler */}
            <Card>
              <CardHeader>
                <CardTitle>Bildirimler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockNotifications.map((notification) => (
                  <div key={notification.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <CheckCircleIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{notification.text}</p>
                      <p className="text-sm text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Hızlı Erişim */}
            <Card>
              <CardHeader>
                <CardTitle>Hızlı Erişim</CardTitle>
              </CardHeader>
              <CardContent>
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
                  <Button variant="outline" className="h-24" onClick={() => router.push('/classmates')}>
                    <UsersIcon className="h-6 w-6 mr-2" />
                    Sınıf Arkadaşlarım
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Akademik Takvim */}
            <Card>
              <CardHeader>
                <CardTitle>Yaklaşan Etkinlikler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="bg-red-100 p-2 rounded-full">
                      <CalendarIcon className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Web Programlama Proje Teslimi</p>
                      <p className="text-sm text-gray-500">18 Mayıs 2025, 23:59</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CalendarIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Veri Yapıları Ara Sınavı</p>
                      <p className="text-sm text-gray-500">22 Mayıs 2025, 10:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}