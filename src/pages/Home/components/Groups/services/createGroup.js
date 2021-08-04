import api from 'services/api';

const createGroup = async (data, token) =>
  api.post(`/groups`, data,
    {
      headers: {
        "Authorization": token,
      }
    }
  )
    .then(async (res) => {
      alert('Grupo criado!');
      const response = { data: res.data, status: res.status };
      return response
    })
    .catch((e) => {
      if (e.response?.data.error === "Not enough permissions") {
        alert("Você não tem permissão para criar Instituições.");
      } else {
        alert('Algo deu errado, tente novamente!');
      }
      console.log(e);
      return { data: {}, errors: e }
    });
export default createGroup;