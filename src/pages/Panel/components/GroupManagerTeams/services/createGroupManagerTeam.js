import api from 'services/api';

const createGroupManagerTeam = async (data, token) =>
  api.post(`/group_manager_team/signup`, data, {
    headers: {
      "Authorization": token,
    },
  })
  .then(async (res) => {
    alert('Criado com sucesso!');
    const response = { data: res.data };
    return response
  })
  .catch((e) => {
    alert('Algo deu errado, tente novamente!');
    console.log(e);
    return { data: {}, errors: e }
  });
    
export default createGroupManagerTeam;