'use client';

import { useRouter } from 'next/navigation';
import { FiX } from 'react-icons/fi';

export default function EditCourseModal() {
  const router = useRouter();
  
  // URL'den kurs ID'sini al
  // Gerçek projede bu ID ile API'den kurs bilgilerini çekeceksiniz
  const searchParams = new URLSearchParams(window.location.search);
  const courseId = searchParams.get('id');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submit işlemleri
    console.log('Kurs güncellendi');
    router.back(); // Modalı kapat
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-bold">Kursu Düzenle</h2>
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
              defaultValue="Next.js ile Modern Web Geliştirme"
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
              defaultValue="Next.js kullanarak modern web uygulamaları geliştirmeyi öğrenin."
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
                defaultValue="web-development"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="web-development">Web Geliştirme</option>
                <option value="mobile">Mobil Geliştirme</option>
                <option value="data-science">Veri Bilimi</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                Durum
              </label>
              <select
                id="status"
                defaultValue="active"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="draft">Taslak</option>
                <option value="active">Yayında</option>
              </select>
            </div>
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
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}