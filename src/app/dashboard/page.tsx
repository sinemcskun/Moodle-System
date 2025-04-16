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
  PlusIcon
} from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';

// Header componentini ayrı bir dosyaya taşıyabilirsiniz
const AppHeader = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => (
  <header className="bg-white shadow-sm py-4 px-6">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img src="/ogmer.png" alt="Logo" width={200} height={100} />
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
            <BookIcon className="mr-2 h-4 w-4" /> Kurslarım
          </Link>
        </Button>

        <Button
          variant={activeTab === 'all-courses' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('all-courses')}
          asChild
        >
          <Link href="/all-courses">
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
);

export default function NewPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('new-page');

  // Mock data for courses
  const courses = [
    { id: 1, name: "Bilgisayar Ağları", code: "BIL402", instructor: "Prof. Dr. Ayşe Demir" },
    { id: 2, name: "Veri Yapıları", code: "BIL301", instructor: "Doç. Dr. Mehmet Yılmaz" },
    { id: 3, name: "Web Programlama", code: "BIL352", instructor: "Dr. Öğr. Üyesi Ali Kaya" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Yeni Kurs Kayıtları</h1>
            <p className="text-gray-600 mt-2">2025-2026 Güz Dönemi için kayıt işlemlerinizi yapabilirsiniz</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{course.name}</CardTitle>
                <p className="text-sm text-gray-500">{course.code}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Kursun Sorumlusu: {course.instructor}</p>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Detaylar
                  </Button>
                  <Button size="sm">
                    Kayıt Ol
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Önemli Duyurular</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">Yeni Kurslara Göz Atın</h3>
                <p className="text-sm text-gray-600 mt-1">17 yeni kurs eklendi. Hemen 'Tüm Kurslar' sayfasından yeni kurslara katılın.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">ÖĞMER Her Zaman Yanında!</h3>
                <p className="text-sm text-gray-600 mt-1">ÖĞMER her zaman yanında!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}