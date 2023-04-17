import * as Yup from 'yup';

// Define the steps as an array of objects
const steps = [
    {
        label: '1',
        initialValues: { name: '', surname: '', email: '' },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            surname: Yup.string().required('Required'),
            age: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
        }),
        fields: [
            {
                label: 'Name',
                name: 'name',
                type: 'text',
            },
            {
                label: 'Surname',
                name: 'surname',
                type: 'text',
            },
            {
                label: 'Email',
                name: 'email',
                type: 'email',
            },
        ],
    },
    {
        label: '2',
        initialValues: { age: '', occupation: '' },
        validationSchema: Yup.object({
            age: Yup.number().required('Required'),
            occupation: Yup.string().required('Required'),
        }),
        fields: [
            {
                label: 'Age',
                name: 'age',
                type: 'number',
            },
            {
                label: 'Occupation',
                name: 'occupation',
                type: 'text',
            },
        ],
    },

    {
        label: '3',
        initialValues: { salary: '', experience: '' },
        validationSchema: Yup.object({
            salary: Yup.number().required('Required'),
            experience: Yup.string().required('Required'),
        }),
        fields: [
            {
                label: 'Salary',
                name: 'salary',
                type: 'number',
            },
            {
                label: 'Experience',
                name: 'experience',
                type: 'text',
            },
        ],
    },
];

export default steps;