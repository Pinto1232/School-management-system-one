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
    label: "Teacher Management",
    path: "/teacher-management",
    icon: FaChalkboardTeacher,
  },
  { label: "Class Management", path: "/class-management", icon: FaSchool },
  {
    label: "Attendance Tracking",
    path: "/attendance-tracking",
    icon: FaUserClock,
  },
  {
    label: "Grading and Assessment",
    path: "/grading-assessment",
    icon: FaFileAlt,
  },
  {
    label: "Timetable Management",
    path: "/timetable-management",
    icon: FaCalendarAlt,
  },
  { label: "Lesson Planning", path: "/lesson-planning", icon: FaBookOpen },
  {
    label: "Parent Communication",
    path: "/parent-communication",
    icon: FaComments,
  },
  { label: "Library Management", path: "/library-management", icon: FaBook },
  { label: "School Calendar", path: "/school-calendar", icon: FaCalendar },
  {
    label: "Online Learning Integration",
    path: "/online-learning",
    icon: FaGraduationCap,
  },
  { label: "Events", path: "/events", icon: FaCalendarAlt },
  { label: "Task", path: "/tasks", icon: FaTasks },
  {
    label: "User Permissions",
    path: "/user-permissions-roles",
    icon: FaUnlockAlt,
  },
];
