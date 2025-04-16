interface Course {
    id: string;
    title: string;
    summary?: string; // Optional yapıldı
    startdate?: string | Date; // Optional
    progress?: number; // Optional
    // Diğer gerekli alanlar...
  }