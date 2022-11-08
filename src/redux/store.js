import { configureStore } from '@reduxjs/toolkit';
import teacherReducer from './reducers/teacher';
import studentReducer from './reducers/student';
import userReducer from './reducers/user';

export const store = configureStore({
  reducer: {
    teacher: teacherReducer,
    student: studentReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
});
