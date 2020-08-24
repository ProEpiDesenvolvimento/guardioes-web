import api from 'services/api';

const getAllContents = async (token) => api
  .get('/contents', {
    headers: {
      "Authorization": token,
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
