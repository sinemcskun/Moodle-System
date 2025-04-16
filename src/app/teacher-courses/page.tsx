import Link from 'next/link';
import { FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';

// Static kurs verileri (gerçek projede API'den çekilecek)
const teacherCourses = [
  {
    id: '1',
    title: 'Next.js ile Modern Web Geliştirme',
    students: 45,
    status: 'active',
    lastUpdated: '2023-10-15',
    thumbnail: '/nextjs-course.jpg'
  },
  {
    id: '2',
    title: 'TypeScript Temelleri',
    students: 32,
    status: 'draft',
    lastUpdated: '2023-09-28',
    thumbnail: '/typescript-course.jpg'
  },
  {
    id: '3',
    title: 'React Advanced Patterns',
    students: 78,
    status: 'active',
    lastUpdated: '2023-11-02',
    thumbnail: '/react-course.jpg'
  }
];

export default function TeacherCoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Kurslarım</h1>
        <Link 
          href="/teacher-courses/create-course"
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="mr-2" />
          Yeni Kurs Oluştur
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kurs Adı</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Öğrenci Sayısı</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Son Güncelleme</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teacherCourses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-md object-cover" src={course.thumbnail} alt={course.title} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{course.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.students}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {course.status === 'active' ? 'Yayında' : 'Taslak'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.lastUpdated}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/teacher-courses/edit-course?id=${course.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FiEdit className="h-5 w-5" />
                      </Link>
                      <button className="text-red-600 hover:text-red-900">
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Kurs yoksa gösterilecek mesaj */}
      {teacherCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Henüz hiç kurs oluşturmadınız.</p>
          <Link 
            href="/teacher-courses/create-course"
            className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            <FiPlus className="mr-2" />
            İlk Kursunu Oluştur
          </Link>
        </div>
      )}
    </div>
  );
}