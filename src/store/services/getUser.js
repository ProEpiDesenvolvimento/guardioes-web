import api from 'services/api';

const getUser = async (id, userType, token) => 
  api.get(`/${userType}s/${id}`, {
    headers: {
      "Authorization": token,
    },
  })
  .then(async (res) => {
    const { data } = res;
    return data
  })
  .catch((e) => {
    console.log(e);
    return { data: {}, errors: e }
  });

export default getUser;
