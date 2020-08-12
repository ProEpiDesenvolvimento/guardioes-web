import api from 'services/api';

const getAllApps = async (token) => api
  .get('/symptoms', {
    headers: {
      "Authorization": token,
    },
  }
  )
  .then(async (res) => {
    const { data } = res;
    console.log(data)
    return data
  })
  .catch((e) => {
    console.log(e);
    return { data: {}, errors: e }
  });

export default getAllApps;
