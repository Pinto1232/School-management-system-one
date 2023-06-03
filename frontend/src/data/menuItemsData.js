import {
  FaBook,
  FaBookOpen,
  FaCalendar,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaComments,
  FaFileAlt,
  FaGraduationCap,
  FaSchool,
  FaTasks,
  FaUnlockAlt,
  FaUserClock,
  FaUsers,
} from "react-icons/fa";

export default [
  { 
    label: "Dashboard", 
    path: "/dashboard",
    icon: FaUsers 
  },
  {
    label: "Students",
    path: "/student",
    icon: FaChalkboardTeacher,
  },
  { 
    label: "Teachers", 
    path: "/teachers", 
    icon: FaSchool 
  },
  {
    label: "Courses",
    path: "/courses",
    icon: FaUserClock,
  },
  {
    label: "Attendance",
    path: "/attendance",
    icon: FaFileAlt,
  },
  {
    label: "Calendar/Events",
    path: "/events",
    icon: FaCalendarAlt,
  },
  { 
    label: "Lesson Planning", 
    path: "/lesson-planning", 
    icon: FaBookOpen 
  },
  {
    label: "Admissions",
    path: "/admissions",
    icon: FaComments,
  },
  { 
    label: "Reports", 
    path: "/reports", 
    icon: FaBook 
  },
  { 
    label: "Fees Management", 
    path: "/fees", 
    icon: FaCalendar 
  },
  {
    label: "Grading",
    path: "/grading",
    icon: FaGraduationCap,
  },
  { 
    label: "Events", 
    path: "/events", 
    icon: FaCalendarAlt 
  },
  { 
    label: "Task", 
    path: "/tasks", 
    icon: FaTasks 
  },
  {
    label: "Parent Portal",
    path: "/parent_portal",
    icon: FaUnlockAlt,
  },
  {
    label: "Staff Management",
    path: "/staff_management",
    icon: FaUnlockAlt,
  },
  {
    label: "Timetable Management",
    path: "/timetable_management",
    icon: FaUnlockAlt,
  },
];
