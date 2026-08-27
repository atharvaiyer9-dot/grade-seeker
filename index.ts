export type Status = "Completed" | "Missing" | "Late" | "Upcoming";
export interface Student { id:string; name:string; gradeLevel:string; }
export interface GradeCategory { name:string; weight:number; }
export interface Assignment { id:string; courseId:string; name:string; category:string; dueDate:string; score:number|null; possiblePoints:number; status:Status; }
export interface Course { id:string; name:string; teacher:string; color:string; courseType:"AP"|"Honors"|"Regular"; credits:number; categories:GradeCategory[]; assignments:Assignment[]; }
export interface Grade { courseId:string; percentage:number; letter:string; trend:number; }
export interface AttendanceRecord { date:string; status:"present"|"absence"|"tardy"; }
export interface SchoolDocument { id:string; name:string; date:string; type:string; }
export interface Message { id:string; sender:string; subject:string; preview:string; date:string; unread:boolean; body:string; }
export interface Semester { name:string; start:string; end:string; }
