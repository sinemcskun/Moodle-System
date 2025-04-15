"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Tooltip from '@mui/material/Tooltip';
import { MoodleService } from '@/lib/moodle/service';
import { Course } from '@/types/moodle';

export default function Dashboard() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fecthData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const userInfo = await MoodleService.getUserInfo(token);
        console.log("user info:",userInfo);

        const userId = userInfo.userid || userInfo.id;
        if (!userId) {
          throw new Error('Kullanıcı ID bulunamadı');
        }

        const coursesData = await MoodleService.getCourses(token, userId);
        console.log("coursesData:",coursesData);
        if(Array.isArray(coursesData)){
          setCourses(coursesData);
        }
        else{
          console.error('API yanıtı beklenen formatta değil:', coursesData);
          setCourses([]);
        }
      } catch (err) {
        setError('Dersler alınamadı');
      } finally {
        setLoading(false);
      }
    };
    fecthData();
  }, [router]);

  const events = [ //aynı şekilde test verileri 
    { date: new Date(2025, 3, 16), title: "Assignment: Secure Software Development" },
    { date: new Date(2025, 3, 30), title: "Wireshark Lab Submission" },
    { date: new Date(2025, 4, 9), title: "ISG Sınavı" },
  ];


  /*
  const user = [
  {id:93283498659 , name:Sinem, surname:Coskun , email:sfsdgds, password:dasfsgs, role:}
  ]
  
  */

  /*Bu kısım takvim üzerinde gerçekleşecek olayların belirtilmesini sağlayan noktalar koyuyor*/
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const event = events.find(e => e.date.toDateString() === date.toDateString());
      return event ? (
        <Tooltip title={event.title} arrow>
          <div className="bg-red-500 w-2 h-2 rounded-full mx-auto mt-1"></div>
        </Tooltip>
      ) : null;
    }
    return null;
  };

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
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-100 border-b p-6 flex justify-between items-center">
        <a href="/" title="Ana Sayfa">
          <img src="/ogmer.png" alt="Logo" width={100} height={50} />
        </a>
        <nav className="flex gap-4">
          <Button onClick={() => router.push('/')} className="bg-red-600 text-white px-4 py-2 rounded-lg">
            Ana Sayfa
          </Button>
          <Button onClick={() => router.push('/courses')} className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Derslerim
          </Button>
          <Button onClick={() => router.push('/profile')} className="bg-yellow-600 text-white px-4 py-2 rounded-lg">
            Profilim
          </Button>
          <Button onClick={() => router.push('/settings')} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Ayarlar
          </Button>
        </nav>
      </header>
      
      {/* Main Content */}
      <main className="p-6 grid grid-cols-3 gap-6">
        {/* Timeline */}
        <section className="col-span-2 bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Zaman Çizelgesi</h2>
          <ul>
            {events.map((event, index) => (
              <li key={index} className="p-2 border-b">{event.title} - {event.date.toLocaleDateString()}</li>
            ))}
          </ul>
        </section>

        {/* Sidebar */}
        <aside className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Derslerim ({courses.length})</h2>
          <ul className="max-h-60 overflow-y-auto">
            {courses.map((course) => (
              <li 
                key={course.id} 
                className="p-2 border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => router.push(`/courses/${course.id}`)}
              >
                {course.fullname}
              </li>
            ))}
          </ul>
          
          {/* Calendar */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Takvim</h2>
            <Calendar onChange={(value) => setDate(value as Date)} value={date} tileContent={tileContent} />
          </div>
        </aside>
      </main>
    </div>
  );
}
