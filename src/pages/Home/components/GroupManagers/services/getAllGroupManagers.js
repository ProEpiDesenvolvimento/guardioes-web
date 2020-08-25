import api from 'services/api';

const getAllGroupManagers = async (token) => api
  .get('/group_managers', {
    headers: {
      "Authorization": token,
    },
  }
  )
  .then(async (res) => {
    const { data } = res;
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA", data)
    return data
  })
  .catch((e) => {
    console.log(e);
    return { data: {}, errors: e }
  });

export default getAllGroupManagers;
