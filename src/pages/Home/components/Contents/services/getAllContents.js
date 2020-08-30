import api from 'services/api';

const getAllContents = async (token) => api
  .get('/contents', {
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNTk4ODE3NTIxLCJleHAiOjE2MDE0NDcyNjcsImp0aSI6ImI2ZGY1MTRiLTJjNTQtNDI3My04YjA5LTI1OWQwNjU3MDkxMSJ9.aTYaDGacM6F8OIS5DbDgT1o4WmqLkvGTGh5yLLFaM_I",
    },
  }
  )
  .then(async (res) => {
    const { data } = res;
    return data
  })
  .catch((e) => {
    console.log(e);
    return { data: {}, errors: e }
  });

export default getAllContents;
