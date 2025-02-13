import axios from 'axios';

export const addStudentService = (student) => {
  // The same student cannot be added to the same class - this will result in a DB error.
  // If the student and/or class does not exist a error will be displayed.

  const url = `${process.env.REACT_APP_API_URL}api.php`;

  const params = {
    action: 'addstudent',
    format: 'json',
  };

  const formData = new FormData();
  formData.append('student_name', student.username);
  formData.append('class_id', student.classId);

  return axios.post(url, formData, { params });
};

export const listStudentsService = (classId) => {
  const url = `${process.env.REACT_APP_API_URL}api.php`;

  const params = {
    action: 'query',
    list: 'studentsinclass',
    format: 'json',
    class_id: classId,
  };

  return axios.get(url, { params });
};

export const giveTaskToStudentService = ({ studentId, taskId }) => {
  const url = `${process.env.REACT_APP_API_URL}api.php`;

  const params = {
    action: 'givetask',
    format: 'json',
  };

  const formData = new FormData();
  formData.append('student_id', studentId);
  formData.append('task_id', taskId);
  formData.append('task_status', 'Pending');

  return axios.post(url, formData, { params });
};
