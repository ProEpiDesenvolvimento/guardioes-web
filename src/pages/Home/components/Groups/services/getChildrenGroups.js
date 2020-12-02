import api from 'services/api';

const getChildrenGroups = async (groupid) => api
  .get(`/groups/${groupid}/get_children`)
  .then(async (res) => {
    const { data } = res;
    return data
  })
  .catch((e) => {
    return { data: {}, errors: e }
  });

export default getChildrenGroups;
