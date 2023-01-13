import api from 'services/api';

const getSurveysGroupCases = async (token, page) => 
  api.get(`/surveys/group_cases?page=${page}`, {
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
