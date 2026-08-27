import { courses, student, attendance, documents, messages } from "@/data/mock";
export const schoolData={getStudent:()=>student,getCourses:()=>courses,getCourse:(id:string)=>courses.find(c=>c.id===id),getAssignments:()=>courses.flatMap(c=>c.assignments.map(a=>({...a,courseName:c.name}))),getAttendance:()=>attendance,getDocuments:()=>documents,getMessages:()=>messages};
