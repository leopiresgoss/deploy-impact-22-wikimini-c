/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField, Box, Typography, Button,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createUser, fetchToken } from '../../redux/reducers/user';
import MainContainer from '../../components/main-container';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object({
  username: yup.string()
    .required('Required')
    .min(5, 'At least 5 characters'),
  password: yup.string()
    .required('Required')
    .min(8, 'At least 8 characters')
    .matches(/[a-z]/, 'At least one upper-case letter')
    .matches(/[A-Z]/, 'At least one lower-case letter')
    .matches(/\d/, 'At least one number')
    .matches(/\W/, 'At least one special symbol'),
  passwordConfirmation: yup.string()
    .required('Required')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

const RegisterPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  React.useEffect(() => {
    dispatch(fetchToken('createaccount'));
  }, [dispatch]);

  console.log(user.status);

  const onSubmit = (values) => {
    console.log('Values entered');
    console.table(values);
    const token = user.data.createaccounttoken;
    dispatch(createUser({ ...values, token }));
  };

  const {
    values, errors, touched, dirty, isValid,
    handleChange, handleBlur, handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <MainContainer>
      <Box widrth="100%" display="flex" flexDirection="column" alignItems="center">
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            width: '400px',
            height: '100%',
            border: '1px solid black',
            p: 4,
          }}
          onSubmit={handleSubmit}
          disabled={!dirty || !isValid}
        >
          <Typography variant="h5" mb={3}>Registration</Typography>
          <TextField
            name="username"
            label="Username"
            type="text"
            variant="filled"
            fullWidth
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="filled"
            fullWidth
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            name="passwordConfirmation"
            label="Repeat password"
            type="password"
            variant="filled"
            fullWidth
            value={values.passwordConfirmation}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.passwordConfirmation && Boolean(errors.passwordConfirmation)}
            helperText={touched.passwordConfirmation && errors.passwordConfirmation}
          />
          <Button
            type="submit"
            disabled={!dirty || !isValid}
            variant="contained"
            size="large"
            sx={(theme) => ({
              background: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            })}
          >
            Register
          </Button>
        </Box>
      </Box>
    </MainContainer>
  );
};

export default RegisterPage;
