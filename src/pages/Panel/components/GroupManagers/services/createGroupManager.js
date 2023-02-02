import api from 'services/api';

const createGroupManagers = async (data, token) =>
  api.post(`/group_manager/signup`, data,
    {
      headers: {
        "Authorization": token,
      }
    }
  )
    .then(async (res) => {
      const response = { data: res.data, status: res.status };
      return response
    })
    .catch((e) => {
      if (e.response.data.error === "You are not authorized to access this page.") {
        alert("Você não tem permissão para criar Gerentes de Instituições.");
      } else {
        alert('Algo deu errado, tente novamente!');
      }      
      console.log(e);
      return { data: {}, errors: e }
    });
export default createGroupManagers;