import api from 'services/api';

const getAllGroupManagerTeams = async (token) => 
  api.get('/group_manager_teams', {
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

export default getAllGroupManagerTeams;