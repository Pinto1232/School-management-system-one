// acl.js

import { Acl } from 'react-acl';

const permissions = {
    admin: ['*'], // All permissions
    manager: [
        'manage:students', 
        'manage:teachers', 
        'manage:classes', 
        'manage:attendance',
        'manage:classroom',
        'manage:course',
        'manage:faculty',
        'manage:enrollment',
    ],
    teacher: [
        'manage:attendance', 
        'manage:grading', 
        'manage:lessons',
        'manage:classroom',
        'manage:course'
    ],
    student: [
        'view:grades', 
        'view:lessons', 
        'view:calendar',
        'view:course',
    ]
};

const acl = new Acl(permissions);

export default acl;
