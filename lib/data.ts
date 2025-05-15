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