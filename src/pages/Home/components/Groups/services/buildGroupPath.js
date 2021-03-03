import { api } from 'services/api';

const buildGroupPath = async (groupid) => api
  .get(`/groups/${groupid}/get_path`)
  .then(async (res) => {
    const { data } = res;
    return data
  })
  .catch((e) => {
    return { data: {}, errors: e }
  });

export default buildGroupPath;
