import axios from 'axios';

export const getToken = async () => {
  const params = {
    action: 'query',
    meta: 'tokens',
    type: '*',
    format: 'json',
  };

  const tokenUrl = `${process.env.REACT_APP_API_URL}api.php`;

  const response = await axios.get(tokenUrl, { params });
  console.log(response);
  const { data, error } = response;

  if (error) {
    return undefined;
  }

  const json = JSON.stringify(data);
  const parsedData = JSON.parse(json);

  return parsedData.query.tokens;
};

export const createUserService = async (userParams) => {
  console.log(userParams.token);
  const params = {
    action: 'createaccount',
    createuserrole: 'Teacher',
    createreturnurl: process.env.REACT_APP_API_URL,
    format: 'json',
  };

  const formData = new FormData();
  formData.append('createtoken', userParams.token.trim());
  formData.append('username', userParams.username);
  formData.append('password', userParams.password);
  formData.append('retype', userParams.passwordConfirmation);

  const url = `${process.env.REACT_APP_API_URL}api.php`;

  const response = await axios.post(url, formData, {
    params,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log(response);

  return response;
};

export const loginUserService = async (user) => {
  const token = await getToken('login');
  console.log(token);
  const params = {
    action: 'clientlogin',
    format: 'json',
    loginreturnurl: 'http://localhost/',
  };

  const formData = new FormData();
  formData.append('logintoken', token.logintoken);
  formData.append('username', user.username);
  formData.append('password', user.password);

  const url = `${process.env.REACT_APP_API_URL}api.php`;

  const response = await axios.post(url, formData, {
    params,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  console.log(response);

  return response;
};
