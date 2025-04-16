"use client";
import {
  User,
  FileText,
  Calendar,
  Folder,
  File,
  Settings,
  LogOut,
  ChevronDown,
  BookOpenIcon
} from 'lucide-react';
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
      {/* Üst Bilgi - Düzenlenmiş ve Hizalanmış */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Sol kısım - Logo ve Başlık yan yana */}
          <div className="flex items-center space-x-4">
            <img src="/ogmer.png" alt="Logo" width={200} height={100} />
          </div>

          {/* Sağ kısım - Navigasyon butonları */}
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

            {/* All Courses Button - New Addition */}
            <Button
              variant={activeTab === 'all-courses' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('all-courses')}
              asChild
            >
              <Link href="/all-courses">
                <BookOpenIcon className="mr-2 h-4 w-4" /> Tüm Dersler
              </Link>
            </Button>

            {/* Profile Dropdown */}
            <div className="relative">
              <div className="group inline-block">
                <Button
                  variant={activeTab === 'profile' ? 'default' : 'ghost'}
                  className="flex items-center space-x-1"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profilim</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>

                {/* Dropdown Menu (unchanged) */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-800">öğrenci numarası</p>
                  </div>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      <User className="mr-2 h-4 w-4" /> Profil
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/grades" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      <FileText className="mr-2 h-4 w-4" /> Başarı notları
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/calendar" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      <Calendar className="mr-2 h-4 w-4" /> Takvim
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/files" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      <Folder className="mr-2 h-4 w-4" /> Kişisel dosyalar
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/reports" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      <File className="mr-2 h-4 w-4" /> Raporlar
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/preferences" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      <Settings className="mr-2 h-4 w-4" /> Tercihler
                    </Link>
                  </Button>
                  <div className="border-t border-gray-200"></div>
                  <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-800" asChild>
                    <Link href="/" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      <LogOut className="mr-2 h-4 w-4" /> Çıkış yap
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
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