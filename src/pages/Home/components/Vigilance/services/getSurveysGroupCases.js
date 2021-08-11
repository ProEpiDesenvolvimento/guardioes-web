import api from 'services/api';

const getSurveysGroupCases = async (token) => 
  api.get('/surveys/group_cases', {
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

export default getSurveysGroupCases;
