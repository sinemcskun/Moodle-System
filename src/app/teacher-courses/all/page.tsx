"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
  User,
  FileText,
  Calendar,
  Folder,
  File as FileIcon,
  Settings,
  LogOut,
  ChevronDown,
  BookOpen as BookOpenIcon,
  Home as HomeIcon,
  Book as BookIcon
} from 'lucide-react';

// Header bileşeni
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
          variant={activeTab === 'teacher-dashboard' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('teacher-dashboard')}
          asChild
        >
          <Link href="/teacher-dashboard">
            <HomeIcon className="mr-2 h-4 w-4" /> Ana Sayfa
          </Link>
        </Button>
        <Button
          variant={activeTab === 'teacher-courses' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('teacher-courses')}
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

// Statik kurs verileri
const staticCourses = [
  {
    id: 1,
    fullname: "Giriş Seviye Siber Güvenlik",
    summary: "Siber güvenliğe giriş ve temel kavramlar.",
    categoryName: "Siber Güvenlik",
    level: "Başlangıç",
    image: "/courses/cybersecurity.jpg"
  },
  {
    id: 2,
    fullname: "JavaScript ile Web Programlama",
    summary: "JavaScript diline giriş ve pratik örneklerle öğrenme.",
    categoryName: "Programlama",
    level: "Orta",
    image: "/courses/javascript.jpg"
  },
  {
    id: 3,
    fullname: "Veri Bilimine Giriş",
    summary: "Veri analizi, görselleştirme ve temel istatistik.",
    categoryName: "Veri Bilimi",
    level: "Başlangıç",
    image: "/courses/data-science.jpg"
  },
  {
    id: 4,
    fullname: "Gelişmiş Yapay Zeka Yöntemleri",
    summary: "Derin öğrenme ve makine öğrenmesi uygulamaları.",
    categoryName: "Yapay Zeka",
    level: "İleri",
    image: "/courses/ai.jpg"
  },
  {
    id: 5,
    fullname: "AWS ile Bulut Bilişime Giriş",
    summary: "AWS servisleri ile bulut altyapısına giriş.",
    categoryName: "Bulut Bilişim",
    level: "Orta",
    image: "/courses/cloud.jpg"
  },
  {
    id: 6,
    fullname: "React ile Modern Web Geliştirme",
    summary: "React framework'ü ile SPA geliştirme.",
    categoryName: "Web Geliştirme",
    level: "İleri",
    image: "/courses/react.jpg"
  }
];

// Statik kategori ve seviye verileri
const categories = ["Tümü", "Siber Güvenlik", "Programlama", "Veri Bilimi", "Bulut Bilişim", "Yapay Zeka", "Web Geliştirme"];
const levels = ["Tümü", "Başlangıç", "Orta", "İleri"];

export default function AllCoursesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all-courses');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedLevel, setSelectedLevel] = useState('Tümü');

  const filteredCourses = staticCourses.filter(course => {
    const matchesSearch = course.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tümü' || course.categoryName === selectedCategory;
    const matchesLevel = selectedLevel === 'Tümü' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Tüm Kurslar</h1>
            <Button onClick={() => router.push('/courses')}>
              Kurslarıma Git
            </Button>
          </div>

          {/* Filtreleme ve Arama */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <span className="absolute left-3 top-3 h-4 w-4 text-gray-400">🔍</span>
                <Input
                  placeholder="Kurs ara..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <select
                  className="w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  className="w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Kurslar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(`/course-details/${course.id}`)}
              >
                <img src={course.image} alt={course.fullname} className="w-full h-40 object-cover" />
                <CardHeader>
                  <CardTitle>{course.fullname}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{course.summary}</p>
                </CardContent>
                <CardFooter className="flex justify-between text-sm text-gray-500">
                  <span>{course.categoryName}</span>
                  <span>{course.level}</span>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Sonuç Bulunamadı */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-100 inline-block p-4 rounded-full mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold">Sonuç Bulunamadı</h3>
              <p className="text-gray-500 mt-1">Arama kriterlerinize uygun kurs bulunamadı.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
