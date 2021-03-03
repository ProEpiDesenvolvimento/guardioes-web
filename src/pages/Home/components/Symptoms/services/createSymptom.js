import { api } from 'services/api';

const createSymptoms = async (data, token) =>
  api.post(`/symptoms`, data,
    {
      headers: {
        "Authorization": token,
      }
    }
  )
    .then(async (res) => {
      const response = { data: res.data };
      return response
    })
    .catch((e) => {
      if (e.response.data.error === "You are not authorized to access this page.") {
        alert("Você não tem permissão para criar Sintomas.");
      } else {
        alert('Algo deu errado, tente novamente!');
      }
      console.log(e);
      return { data: {}, errors: e }
    });
export default createSymptoms;