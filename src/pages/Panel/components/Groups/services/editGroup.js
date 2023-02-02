import api from 'services/api';

const editGroup = async (id, data, token) => 
    api.patch(`/groups/${id}`, data,
    {
      headers: {
        "Authorization": token,
      }
    }
  )
    .then(async (res) => {
      alert('Grupo Editado!');
      const response = { data: res.data };
      return response
    })
    .catch((e) => {
      if (e.response?.data.error === "Not enough permissions") {
        alert("Você não tem permissão para editar Instituições.");
      } else {
        alert('Algo deu errado, tente novamente!');
      }
      console.log(e);
      return { data: {}, errors: e };
    });
export default editGroup;