import axios from 'axios';
import { Course } from '@/types/moodle';

const MOODLE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const MoodleService = {
  async getUserInfo(token: string) {
    try {
      const response = await axios.get(`${MOODLE_API_URL}/webservice/rest/server.php`, {
        params: {
          wstoken: token,
          wsfunction: 'core_webservice_get_site_info',
          moodlewsrestformat: 'json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Kullanıcı bilgileri alınamadı');
    }
  },

  async getCourses(token: string, userId: number): Promise<Course[]> {
    try {
      const response = await axios.get(`${MOODLE_API_URL}/webservice/rest/server.php`, {
        params: {
          wstoken: token,
          wsfunction: 'core_enrol_get_users_courses',
          moodlewsrestformat: 'json',
          userid: userId,
        },
      });
      
    // Hata yanıtı kontrolü
    if (response.data.exception) {
        console.error('Moodle API Error:', response.data);
        throw new Error(response.data.message || 'Dersler alınamadı');
      }
  
      // Yanıtın dizi olduğundan emin ol
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('API Request Failed:', error);
      throw new Error('Ders listesi alınamadı');
    }
  },

  async getCoursesContent(token: string, courseId: number) {
    try {
      const response = await axios.get(`${MOODLE_API_URL}/webservice/rest/server.php`, {
        params: {
          wstoken: token,
          wsfunction: 'core_course_get_contents',
          moodlewsrestformat: 'json',
          courseid: courseId,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Ders içeriği alınamadı');
    }
  },

  async getCourseInfo(token: string, courseId: number) {
    const response = await axios.get(`${MOODLE_API_URL}/webservice/rest/server.php`, {
      params: {
        wstoken: token,
        wsfunction: 'core_course_get_courses',
        moodlewsrestformat: 'json',
        'options[ids][0]': courseId
      }
    });
    return response.data[0];
  },

  async getUpcomingEvents(token: string, userId: number) {
    try {
      const response = await axios.get(`${MOODLE_API_URL}/webservice/rest/server.php`, {
        params: {
          wstoken: token,
          wsfunction: 'core_calendar_get_calendar_events',
          moodlewsrestformat: 'json',
          options: JSON.stringify({
            userevents: 1,
            siteevents: 1,
          }),
        },
      });
      return response.data.events;
    } catch (error) {
      throw new Error('Etkinlikler alınamadı');
    }
  }
};