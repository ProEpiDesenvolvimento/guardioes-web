import api from 'services/api';

const editRumor = async (id, data, token) => {
  await api.patch(`/rumors/${id}`, data,
    {
      headers: {
        "Authorization": token,
      }
    }
  )
    .then(async (res) => {
      alert('Rumor Editado!');
      const response = { data: res.data };
      return response;
    })
    .catch((e) => {
      if (e.response.data.error === "You are not authorized to access this page.") {
        alert("Você não tem permissão para editar Usuários.");
      } else {
        alert('Algo deu errado, tente novamente!');
      }
      console.log(e);
      return { data: {}, errors: e };
    });
}
export default editRumor;