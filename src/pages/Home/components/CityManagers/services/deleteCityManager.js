import api from 'services/api';

const deleteCityManagers = async (id, token) => 
  api.delete(`/city_managers/${id}`, {
    headers: {
      "Authorization": token,
    },
  })
  .then(async (res) => {
    const { data } = res;
    return data
  })
  .catch((e) => {
    if (e.response.data.error === "You are not authorized to access this page.") {
      alert("Você não tem permissão para deletar Gerentes de Instituições.");
    }
    console.log(e);
  });

export default deleteCityManagers;
