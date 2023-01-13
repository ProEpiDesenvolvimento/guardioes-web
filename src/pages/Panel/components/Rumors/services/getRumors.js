import api from 'services/api';

const getRumors = async (token) => 
  api.get(`/rumors/`, {
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
      alert("Você não tem permissão para visualizar os Rumores.");
    }
    console.log(e);
    return { data: {}, errors: e }
  });

export default getRumors;