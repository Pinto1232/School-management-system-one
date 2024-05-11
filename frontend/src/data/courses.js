export const courses = [
  {
    id: 'course1',
    name: 'Introduction to Programming',
    duration: '1 week',
    description: 'Learn the basics of programming with this introductory course.',
    assignments: [
      { id: 'assignment1', name: 'Homework #1', dueDate: '2023-05-10' },
      { id: 'assignment2', name: 'Project #1', dueDate: '2023-05-24' },
    ],
    materialsLink: '/course1/materials',
    rating: 5,
    level: 'advance',
    gradesLink: '/course1/grades',
    imageUrl: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  
  },
  {
    id: 'course2',
    duration: '4 week',
    name: 'Advanced Programming',
    description: 'Dive deeper into programming concepts with advanced topics.',
    assignments: [
      { id: 'assignment1', name: 'Homework #2', dueDate: '2023-06-15' },
      { id: 'assignment2', name: 'Project #2', dueDate: '2023-07-05' },
    ],
    rating: 12,
    level: 'begginer',
    materialsLink: '/course2/materials',
    gradesLink: '/course2/grades',
    imageUrl: 'https://images.pexels.com/photos/1181269/pexels-photo-1181269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
  },
  {
    id: 'course3',
    duration: '1 month',
    name: 'Data Structures',
    description: 'Learn about various data structures and their applications.',
    assignments: [
      { id: 'assignment1', name: 'Homework #3', dueDate: '2023-08-20' },
      { id: 'assignment2', name: 'Project #3', dueDate: '2023-09-10' },
    ],
    level: 'advance',
    materialsLink: '/course3/materials',
    rating: 25,
    gradesLink: '/course3/grades',
    imageUrl: 'https://images.pexels.com/photos/3184170/pexels-photo-3184170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  
  },
  {
    id: 'course4',
    duration: '1 week',
    name: 'Data Structures',
    description: 'Learn about various data structures and their applications.',
    assignments: [
      { id: 'assignment1', name: 'Homework #3', dueDate: '2023-08-20' },
      { id: 'assignment2', name: 'Project #3', dueDate: '2023-09-10' },
    ],
    level: 'begginer',
    materialsLink: '/course3/materials',
    rating: -5,
    gradesLink: '/course3/grades',
    imageUrl: 'https://images.pexels.com/photos/8284725/pexels-photo-8284725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  
  }
];