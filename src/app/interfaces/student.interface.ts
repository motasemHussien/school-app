export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  year: string;
  class: string;
  image: string;
  subjects: {
    name: string;
    grade: string;
  }[];
}
