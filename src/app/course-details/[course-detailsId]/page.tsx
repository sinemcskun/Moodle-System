// app/course-details/[courseId]/page.tsx
'use client'; // useState için gerekli

import { useState } from 'react';
import Link from 'next/link';
import {
  User,
  FileText,
  Calendar as CalendarIcon,
  Folder,
  File as FileIcon,
  Settings,
  LogOut,
  ChevronDown,
  BookOpen as BookOpenIcon,
  Home as HomeIcon,
  Book as BookIcon,
  CheckCircle2 as CheckIcon,
  BarChart2 as BarChartIcon,
  Mail as MailIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';


const AppHeader = ({ 
  activeTab, 
  setActiveTab 
}: { 
  activeTab: string; 
  setActiveTab: (tab: string) => void 
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
                  <CalendarIcon className="mr-2 h-4 w-4" /> Takvim
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
interface Course {
  id: number;
  title: string;
  description: string;
  content: string[];
  instructor: string;
  duration: string;
  price: number;
  image: string;
}

// Tüm mock kurslar
const allCourses: Course[] = [
  {
    id: 1,
    title: "Siber Güvenlik Temelleri",
    description: "Siber güvenlik dünyasına giriş yapın, temel kavramları öğrenin.",
    instructor: "Ahmet Yılmaz",
    duration: "6 Hafta",
    price: 0,
    image: "/images/cyber-security.jpg",
    content: [
      "Modül 1: Siber Güvenliğe Giriş",
      "Modül 2: Ağ Güvenliği Temelleri",
      "Modül 3: Ethical Hacking",
      "Modül 4: Sızma Testleri",
      "Modül 5: Siber Saldırıları Önleme"
    ]
  },
  {
    id: 2,
    title: "Web Geliştirme",
    description: "Modern web teknolojilerini öğrenin.",
    instructor: "Mehmet Kaya",
    duration: "8 Hafta",
    price: 0,
    image: "/images/web-dev.jpg",
    content: [
      "Modül 1: HTML/CSS",
      "Modül 2: JavaScript",
      "Modül 3: React.js",
      "Modül 4: Backend Temelleri"
    ]
  }
];

export default function CourseDetailsPage({ params }: { params: { courseId: string } }) {
  const [isJoined, setIsJoined] = useState(false);
  const [activeTab, setActiveTab] = useState('courses');
  
  // URL'deki courseId'yi number'a çevir
  const courseId = parseInt(params.courseId);
  
  // Mock veriden kursu bul (bulunamazsa ilk kursu göster)
  const course = allCourses.find(c => c.id === courseId) || allCourses[0];

  const handleJoinCourse = () => {
    setIsJoined(true);
    setTimeout(() => {
      alert(`Tebrikler! ${course.title} kursuna kaydoldunuz.`);
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
       <AppHeader activeTab={activeTab} setActiveTab={setActiveTab} />

       <main className="flex-1 container mx-auto py-8 px-4">
       <div className="max-w-4xl mx-auto px-4">
        {/* Kurs Detay Üst Kısım */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img 
                className="h-48 w-full object-cover md:w-64" 
                src={course.image}
                alt={course.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/cyber-security.jpg';
                }}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
                {course.duration} • {course.price} TL
              </div>
              <h1 className="mt-2 text-2xl font-extrabold text-gray-900">
                {course.title}
              </h1>
              <p className="mt-3 text-gray-500">
                {course.description}
              </p>
              <div className="mt-4">
                <span className="text-gray-700">Eğitmen: </span>
                <span className="font-medium">{course.instructor}</span>
              </div>
              <button
                onClick={handleJoinCourse}
                disabled={isJoined}
                className={`mt-6 px-6 py-3 rounded-md font-medium ${
                  isJoined 
                    ? 'bg-green-500 text-white cursor-not-allowed' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {isJoined ? 'Kursa Kayıtlı' : 'Kursa Katıl'}
              </button>
            </div>
          </div>
        </div>

        {/* Kurs İçeriği */}
        <div className="bg-white shadow overflow-hidden rounded-lg mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Kurs İçeriği
            </h3>
          </div>
          <div className="px-6 py-4">
            <ul className="divide-y divide-gray-200">
              {course.content.map((item, index) => (
                <li key={index} className="py-4 flex">
                  <div className="mr-3 flex-shrink-0">
                    <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 text-sm font-medium">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-800">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Geri Dön Butonu */}
        <Link 
          href="/all-courses" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
        >
          ← Tüm Kurslara Dön
        </Link>
      </div>
       </main>
      
    </div>
  );
}