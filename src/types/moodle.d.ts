export type Course = {
  id: number;
  fullname: string;
  shortname: string;
};

export type CourseContent = {
  id: number;
  name: string;
  modules?: CourseModule[];
};

export type CourseModule = {
  id: number;
  name: string;
  description?: string;
  contents?: CourseContentFile[];
};

export type CourseContentFile = {
  filename: string;
  fileurl: string;
  filesize?: number;
  mimetype?: string;
};