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
  UsersIcon,
  EditIcon
} from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');

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

            {/* All Courses Button - New Addition */}
            <Button
              variant={activeTab === 'all-courses' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('all-courses')}
              asChild
            >
              <Link href="/all-courses">
                <BookOpenIcon className="mr-2 h-4 w-4" /> Tüm Kurslarım
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

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-800">öğrenci numarası</p>
                  </div>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/teacher-profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
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
          {/* Sol sütun - Profil bilgileri */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Profil Bilgilerim</CardTitle>
                <Button variant="outline" size="sm">
                  <EditIcon className="h-4 w-4 mr-2" />
                  Düzenle
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Ad Soyad</h3>
                    <p className="text-lg">Ahmet Yılmaz</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">E-posta</h3>
                    <p className="text-lg">ahmet.yilmaz@example.com</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Öğrenci No</h3>
                    <p className="text-lg">202312345</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Bölüm</h3>
                    <p className="text-lg">Bilgisayar Mühendisliği</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sağ sütun - Diğer bilgiler */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kayıtlı Kurslarım</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <BookIcon className="h-5 w-5 mr-3 text-blue-600" />
                    <span>Bilgisayar Ağları</span>
                  </div>
                  <div className="flex items-center">
                    <BookIcon className="h-5 w-5 mr-3 text-blue-600" />
                    <span>Veri Yapıları</span>
                  </div>
                  <div className="flex items-center">
                    <BookIcon className="h-5 w-5 mr-3 text-blue-600" />
                    <span>Web Programlama</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hesap Ayarları</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full mb-3" onClick={() => router.push('/change-password')}>
                  Şifre Değiştir
                </Button>
                <Button variant="outline" className="w-full">
                  Bildirim Ayarları
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}