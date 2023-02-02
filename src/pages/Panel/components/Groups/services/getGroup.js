import api from 'services/api';

const getGroups = async (groupid, token) => api
  .get(`/groups/${groupid}`, {
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
    return { data: {}, errors: e }
  });

export default getGroups;
