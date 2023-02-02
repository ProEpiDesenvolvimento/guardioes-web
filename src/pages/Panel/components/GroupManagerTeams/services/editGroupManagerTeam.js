import api from 'services/api';

const editManager = async (id, data, token) => {
  api.patch(`/group_manager_teams/${id}`, data, {
    headers: {
      "Authorization": token,
    }
  })
  .then(async (res) => {
    alert('Equipe de Instituição editada!');
    const response = { data: res.data };
    return response;
  })
  .catch((e) => {
    alert(e);
    console.log(e);
    return { data: {}, errors: e };
  });
}

export default editManager;