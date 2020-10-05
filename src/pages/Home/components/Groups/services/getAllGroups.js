import api from 'services/api';

const getAllGroups = async (token, filter) => api
  .get(`/groups?filter_by=${filter}`, {
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

export default getAllGroups;
