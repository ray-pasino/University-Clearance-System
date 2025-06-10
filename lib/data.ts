export interface studentInfo {
    faculty:string;
    department:string;
    programme:string;
    level:number;
    session:string;
    indexnumber:number;
    campus:string;
    mobilenumber:string;
    cohort:number;
    name:string;
    clearancestatus:string;
    image?:string;
}

export const StudentData:studentInfo[] = [

    {
      faculty:"FACULTY OF COMPUTING AND INFORMATION SYSTEMS",
      department:"COMPUTER SCIENCE",
      programme:"BSc. COMPUTER SCIENCE",
      level:400,
      session:"Morning",
      indexnumber:4231230038,
      campus:"Accra",
      mobilenumber:"0242049602",
      cohort:2021/2022,
      name:"Kwame Ewudzie",
      clearancestatus:"Not Requested"
    }
]




export interface Course {
  course: string;
  grade: string;
}

export interface Semester {
  name: string;
  courses: Course[];
  gpa: string;
}

export interface AcademicYear {
  year: string;
  semesters: Semester[];
}

export const studentGrades: AcademicYear[] = [
  {
    year: "Level 100 (2021 / 2022)",
    semesters: [
      {
        name: "Semester 1",
        courses: [
          { course: "Introduction to Computer Science", grade: "A" },
          { course: "Programming Fundamentals", grade: "A-" },
          { course: "Communication Skills I", grade: "B+" },
          { course: "Algebra and Trigonometry", grade: "A" },
          { course: "Introduction to Logic", grade: "B" },
          { course: "IT Tools", grade: "A" },
        ],
        gpa: "3.75",
      },
      {
        name: "Semester 2",
        courses: [
          { course: "Object-Oriented Programming", grade: "A-" },
          { course: "Calculus I", grade: "B+" },
          { course: "Communication Skills II", grade: "B" },
          { course: "Discrete Mathematics", grade: "A" },
          { course: "Statistics", grade: "B+" },
          { course: "African Studies", grade: "A-" },
        ],
        gpa: "3.65",
      },
    ],
  },
  {
    year: "Level 200 (2022 / 2023)",
    semesters: [
      {
        name: "Semester 1",
        courses: [
          { course: "Data Structures and Algorithms", grade: "A" },
          { course: "Computer Architecture", grade: "B+" },
          { course: "Database Systems I", grade: "A-" },
          { course: "Systems Analysis & Design", grade: "B" },
          { course: "Linear Algebra", grade: "A-" },
          { course: "Technical Writing", grade: "A" },
        ],
        gpa: "3.70",
      },
      {
        name: "Semester 2",
        courses: [
          { course: "Operating Systems", grade: "A" },
          { course: "Web Technologies", grade: "A-" },
          { course: "Software Engineering Principles", grade: "B+" },
          { course: "Database Systems II", grade: "A" },
          { course: "Probability & Statistics", grade: "A-" },
          { course: "Entrepreneurship", grade: "A" },
        ],
        gpa: "3.80",
      },
    ],
  },
  {
    year: "Level 300 (2023 / 2024)",
    semesters: [
      {
        name: "Semester 1",
        courses: [
          { course: "Advanced Operating Systems", grade: "A-" },
          { course: "Mobile Application Development", grade: "B+" },
          { course: "Web Technologies II", grade: "A" },
          { course: "Software Quality Assurance", grade: "B+" },
          { course: "Elective I", grade: "A-" },
        ],
        gpa: "3.68",
      },
      {
        name: "Semester 2",
        courses: [
          { course: "Software Engineering Project", grade: "A" },
          { course: "Embedded Systems", grade: "B" },
          { course: "Human-Computer Interaction", grade: "A-" },
          { course: "Elective II", grade: "A" },
          { course: "Professional Practice", grade: "A" },
        ],
        gpa: "3.72",
      },
    ],
  },
  {
    year: "Level 400 (2024 / 2025)",
    semesters: [
      {
        name: "Semester 1",
        courses: [
          { course: "Artificial Intelligence", grade: "A" },
          { course: "Machine Learning", grade: "A-" },
          { course: "Network Security", grade: "B+" },
          { course: "Elective III", grade: "A" },
        ],
        gpa: "3.85",
      },
      {
        name: "Semester 2",
        courses: [
          { course: "Final Year Project / Thesis", grade: "A" },
          { course: "Advanced Topics in AI", grade: "A-" },
          { course: "IT Policy & Ethics", grade: "A" },
        ],
        gpa: "3.90",
      },
    ],
  },
];
