'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiX, FiPlus } from 'react-icons/fi';
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
import Link from 'next/link';

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

export default function CreateCoursePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('courses');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submit işlemleri
    console.log('Yeni kurs oluşturuldu');
    router.push('/teacher-courses'); // Kurslar sayfasına yönlendir
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50 mt-16">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center border-b p-4">
            <h2 className="text-xl font-bold">Yeni Kurs Oluştur</h2>
            <button 
              onClick={() => router.back()}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Kurs Başlığı
              </label>
              <input
                id="title"
                type="text"
                placeholder="Örneğin: Next.js ile Modern Web Geliştirme"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Kurs Açıklaması
              </label>
              <textarea
                id="description"
                placeholder="Kursunuz hakkında detaylı bir açıklama..."
                rows={4}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                  Kategori
                </label>
                <select
                  id="category"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Kategori seçin</option>
                  <option value="web-development">Web Geliştirme</option>
                  <option value="mobile">Mobil Geliştirme</option>
                  <option value="data-science">Veri Bilimi</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
                  Seviye
                </label>
                <select
                  id="level"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Seviye seçin</option>
                  <option value="beginner">Başlangıç</option>
                  <option value="intermediate">Orta</option>
                  <option value="advanced">İleri</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnail">
                Kurs Görseli
              </label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                İptal
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Oluştur
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}