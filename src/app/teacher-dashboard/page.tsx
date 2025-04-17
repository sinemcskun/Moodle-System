"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Shadcn/ui veya kendi buton bileşeniniz
import { 
  HomeIcon, 
  BookIcon, 
  BookOpenIcon, 
  User,
  ChevronDown,
  FileText,
  Calendar,
  Folder,
  FileIcon,
  Settings,
  LogOut
} from 'lucide-react'; // veya kullandığınız ikon kütüphanesi

const AppHeader = ({
  activeTab,
  setActiveTab
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => (
  <header className="bg-white shadow-sm py-4 px-6">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <img src="/ogmer.png" alt="Logo" width={200} height={100} />
        </Link>
      </div>

      <nav className="flex gap-2">
        <Button
          variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('dashboard')}
          asChild
        >
          <Link href="/teacher-dashboard">
            <HomeIcon className="mr-2 h-4 w-4" /> Ana Sayfa
          </Link>
        </Button>
        <Button
          variant={activeTab === 'courses' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('courses')}
          asChild
        >
          <Link href="/teacher-courses">
            <BookIcon className="mr-2 h-4 w-4" /> Kurslarım
          </Link>
        </Button>
        <Button
          variant={activeTab === 'all-courses' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('all-courses')}
          asChild
        >
          <Link href="/teacher-courses/all">
            <BookOpenIcon className="mr-2 h-4 w-4" /> Tüm Kurslar
          </Link>
        </Button>

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

            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-800">Öğretmen Profili</p>
              </div>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/teacher-profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  <User className="mr-2 h-4 w-4" /> Profil
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/grades" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  <FileText className="mr-2 h-4 w-4" /> Öğrenci Notları
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/calendar" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  <Calendar className="mr-2 h-4 w-4" /> Takvim
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/files" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  <Folder className="mr-2 h-4 w-4" /> Ders Materyalleri
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/reports" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  <FileIcon className="mr-2 h-4 w-4" /> Raporlar
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
);

export default function TeacherDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Öğretmen Panosu</h1>
          <p className="text-gray-600">Hoş geldiniz! Son aktiviteleriniz ve istatistikler burada görüntülenecek.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* İstatistik Kartları */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Aktif Kurslar</h3>
            <p className="text-3xl font-bold mt-2">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Toplam Öğrenci</h3>
            <p className="text-3xl font-bold mt-2">245</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Yaklaşan Dersler</h3>
            <p className="text-3xl font-bold mt-2">3</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Bekleyen Görevler</h3>
            <p className="text-3xl font-bold mt-2">7</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Son Aktivite */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Son Aktivite</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border-b pb-4 last:border-b-0">
                  <p className="text-gray-600">Bugün 14:3{item}</p>
                  <p>Kurs ödevi için {item} yeni gönderim alındı</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hızlı Erişim */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Hızlı Erişim</h2>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/teacher-courses/create">
                  Yeni Kurs Oluştur
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/grades">
                  Notları Giriş Yap
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/calendar">
                  Ders Programı Ekle
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/announcements">
                  Duyuru Yayınla
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}