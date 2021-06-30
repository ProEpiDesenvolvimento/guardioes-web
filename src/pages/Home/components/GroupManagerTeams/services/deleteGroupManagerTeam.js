import api from 'services/api';

const deleteGroupManagerTeam = async (id, token) => 
  api.delete(`/group_manager_teams/${id}`, {
    headers: {
      "Authorization": token,
    },
  })
  .then(async (res) => {
    alert('Excluido com sucesso!');
    const { data } = res;
    return data
  })
  .catch((e) => {
    console.log(e);
  });

export default deleteGroupManagerTeam;