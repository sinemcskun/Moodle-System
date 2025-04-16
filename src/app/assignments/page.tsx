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
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';

export default function AssignmentsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('assignments');

  // Mock data - Gerçek veri bağlantısı yok
  const assignments = [
    {
      id: 1,
      title: "Güvenli Yazılım Geliştirme Ödevi",
      course: "Bilgisayar Ağları",
      dueDate: "2025-05-15",
      submitted: true,
      grade: "90/100"
    },
    {
      id: 2,
      title: "React Proje Teslimi",
      course: "Web Programlama",
      dueDate: "2025-05-20",
      submitted: false,
      grade: null
    },
    {
      id: 3,
      title: "Veri Yapıları Algoritma Analizi",
      course: "Veri Yapıları",
      dueDate: "2025-05-10",
      submitted: true,
      grade: "85/100"
    },
    {
      id: 4,
      title: "Ağ Güvenliği Makalesi",
      course: "Bilgisayar Ağları",
      dueDate: "2025-06-01",
      submitted: false,
      grade: null
    }
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
                <BookOpenIcon className="mr-2 h-4 w-4" /> Tüm Kurslar
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Ödevlerim</h1>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/courses">
                <BookIcon className="mr-2 h-4 w-4" /> Kurslara Dön
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{assignment.title}</CardTitle>
                <p className="text-sm text-gray-500">{assignment.course}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    Teslim Tarihi: {new Date(assignment.dueDate).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  {assignment.submitted ? (
                    <>
                      <CheckCircleIcon className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600">Teslim Edildi</span>
                    </>
                  ) : (
                    <>
                      <ClockIcon className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-yellow-600">Bekliyor</span>
                    </>
                  )}
                </div>

                {assignment.grade && (
                  <div className="mt-2 p-2 bg-blue-50 rounded-md">
                    <p className="text-sm font-medium text-blue-800">
                      Not: {assignment.grade}
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/assignments/${assignment.id}`}>
                    Detayları Gör
                  </Link>
                </Button>
                {!assignment.submitted && (
                  <Button size="sm" asChild>
                    <Link href={`/assignments/${assignment.id}/submit`}>
                      Teslim Et
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Boş durum */}
        {assignments.length === 0 && (
          <div className="text-center py-12">
            <FileTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium">Gösterilecek ödev bulunamadı</h3>
            <p className="mt-1 text-gray-500">Henüz size atanmış bir ödev yok.</p>
            <div className="mt-6">
              <Button asChild>
                <Link href="/courses">
                  Kurslarıma Dön
                </Link>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// PlusIcon eklemeniz gerekirse
function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}