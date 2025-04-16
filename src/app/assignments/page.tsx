"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { FileTextIcon, CalendarIcon, CheckCircleIcon, ClockIcon, BookIcon } from "@/components//ui/icons";
import Link from "next/link";

export default function AssignmentsPage() {
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
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Ödevlerim</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/courses">
              <BookIcon className="mr-2 h-4 w-4" /> Derslere Dön
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
                Derslerime Dön
              </Link>
            </Button>
          </div>
        </div>
      )}
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