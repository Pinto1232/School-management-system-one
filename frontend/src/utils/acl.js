// acl.js

import { Acl } from 'react-acl';

const permissions = {
  admin: ['*'], // All permissions
  manager: ['manage:students', 'manage:teachers', 'manage:classes'],
  teacher: ['manage:attendance', 'manage:grading', 'manage:lessons'],
  student: ['view:grades', 'view:lessons', 'view:calendar']
};

const acl = new Acl(permissions);

export default acl;
