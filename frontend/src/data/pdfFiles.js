  //pdf Viewer
  const pdfFiles = [
    {
      id: 'pdf1',
      title: 'Introduction to Algorithms',
      thumbnail: 'src/assets/images/about-us.jpg',
      url: '/pdfs/introduction-to-algorithms.pdf',
      isFree: true,
    },
    {
      id: 'pdf2',
      title: 'Introduction to Java',
      thumbnail: 'src/assets/images/faqs.jpg',
      url: '/pdfs/introduction-to-algorithms.pdf',
      isFree: true,
    },
    {
      id: 'pdf3',
      title: 'Advanced Chemistry',
      thumbnail: 'src/assets/images/basic-plan.jpg',
      url: '/pdfs/advanced-chemistry.pdf',
      isFree: false,
      price: '30.99',
      onPurchase: () => {
        console.log('Initiate purchase for Advanced Chemistry')
      },
    },
    {
      id: 'pdf4',
      title: 'Advanced React Js',
      thumbnail: 'src/assets/images/basic-plan.jpg',
      url: '/pdfs/advanced-chemistry.pdf',
      isFree: false,
      price: '20.99',
      onPurchase: () => {
        console.log('Initiate purchase for Advanced Chemistry')
      },
    },
    {
      id: 'pdf5',
      title: 'Introduction to MuSQL',
      thumbnail: 'src/assets/images/school.jpg',
      url: '/pdfs/introduction-to-algorithms.pdf',
      isFree: true,
    },
    {
      id: 'pdf6',
      title: 'Advanced JavaScript',
      thumbnail: 'src/assets/images/background-01.jpg',
      url: '/pdfs/advanced-chemistry.pdf',
      isFree: false,
      price: '19.99',
      onPurchase: () => {
        console.log('Initiate purchase for Advanced Chemistry')
      },
    },
  ]
  console.log('pdf files', pdfFiles)
  export default pdfFiles;
