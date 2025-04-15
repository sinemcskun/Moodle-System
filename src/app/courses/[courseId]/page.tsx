"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MoodleService } from '@/lib/moodle/service';

type CourseContent = {
  id: number;
  name: string;
  modules?: Array<{
    id: number;
    name: string;
    description?: string;
    contents?: Array<{
      filename: string;
      fileurl: string;
    }>;
    dates?: {
      start: string;
      due: string;
    };
  }>;
};

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const [content, setContent] = useState<CourseContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseShortName, setCourseShortName] = useState('');

  useEffect(() => {
    const fetchCourseContent = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }
        const userInfo = await MoodleService.getUserInfo(token);
        const userId = userInfo.userid || userInfo.id;
        const coursesData = await MoodleService.getCourses(token, userId);
        const courseContent = await MoodleService.getCoursesContent(token, Number(courseId));
        console.log("courseContent:", courseContent);
        
        setContent(courseContent);
        setCourseName(coursesData[0]?.fullname || 'Ders İçeriği'); 
        setCourseShortName(coursesData[0]?.shortname || 'Ders Kodu');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ders içeriği alınamadı');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseContent();
  }, [courseId, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Üst Bilgi */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">{courseName}</h1>
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <span>Kurslarım</span>
            <span className="mx-2">›</span>
            <span>{courseShortName}</span>
          </div>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          {/* İçindekiler Tablosu */}
          <div className="border-b p-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">İçindekiler</h2>
              <div className="flex space-x-2">
                <button className="text-xs text-blue-600 hover:underline">Tümünü genişlet</button>
                <span className="text-gray-300">|</span>
                <button className="text-xs text-blue-600 hover:underline">Tümünü daralt</button>
              </div>
            </div>
          </div>

          {/* Ders Bölümleri */}
          {content.map((section) => (
            <div key={section.id} className="border-b">
              {/* Bölüm Başlığı */}
              <div className="p-3 bg-gray-50 border-t">
                <h2 className="font-medium text-gray-800 flex items-center">
                  <svg 
                    className="w-4 h-4 mr-2 text-gray-500 cursor-pointer" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                  {section.name}
                </h2>
              </div>
              
              {/* Modüller */}
              {section.modules?.map((module) => (
                <div key={module.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1 mr-3">
                          {module.contents?.length ? (
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">{module.name}</h3>
                          {module.description && (
                            <div 
                              className="prose prose-sm max-w-none mt-1 text-gray-600" 
                              dangerouslySetInnerHTML={{ __html: module.description }} 
                            />
                          )}
                          {/* Dosya Linkleri */}
                          <div className="mt-2 space-y-1">
                            {module.contents?.map((content, idx) => (
                              <a
                                key={idx}
                                href={`${content.fileurl}?token=${localStorage.getItem('token')}`}
                                download={content.filename}
                                className="flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline pl-2 py-1"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                {content.filename}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Tarih Bilgileri */}
                    {module.dates && (
                      <div className="ml-4 text-right">
                        <div className="text-xs text-gray-500 mb-1">
                          <span className="font-medium">Açılış:</span> {module.dates.start}
                        </div>
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">Son teslim:</span> {module.dates.due}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}