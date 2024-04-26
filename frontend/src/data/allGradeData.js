  // All grade data  by semester
  export const allGradeData = {
    'Fall 2022': {
      studentName: 'John Doe',
      GPA: 3.8,
      cumulativeGrade: 'A',
      courses: [
        {
          name: 'Mathematics',
          grade: 'A',
          assessments: [
            {
              type: 'Assignment',
              name: 'Homework 1',
              grade: 'A',
              dueDate: '2022-09-10',
              submitted: true,
              feedback: 'Great work!',
            },
            {
              type: 'Quiz',
              name: 'Quiz 1',
              grade: 'A-',
              dueDate: '2022-09-15',
              submitted: true,
              feedback: 'Good effort!',
            },
          ],
        },
      ],
    },
    'Spring 2023': {
      studentName: 'John Doe',
      GPA: 3.9,
      cumulativeGrade: 'A',
      courses: [
        {
          name: 'History',
          grade: 'B+',
          assessments: [
            {
              type: 'Essay',
              name: 'Essay on WWI',
              grade: 'B',
              dueDate: '2023-02-20',
              submitted: true,
              feedback: 'Well-researched essay.',
            },
            {
              type: 'Exam',
              name: 'Midterm Exam',
              grade: 'A-',
              dueDate: '2023-03-25',
              submitted: true,
              feedback: 'Excellent understanding of the material.',
            },
          ],
        },
      ],
    },
  }
  console.log('Grade data', allGradeData)
  