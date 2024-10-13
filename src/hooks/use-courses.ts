import { useEffect, useState } from "react";

export type CourseModel = {
  id: string;
  title: string;
  description: string;
  image: string;
};

function fetchCourses() {
  return fetch("/courses.json").then((data) => data.json());
}

export default function useCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses().then((courses) => {
      setCourses(courses);
    });
  }, []);

  return [courses as CourseModel[]];
}
