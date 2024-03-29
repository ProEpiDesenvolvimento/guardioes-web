import api from 'services/api';

const getForm = async (id, token) => 
  api.get(`/forms/${id}`, {
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
      alert("Você não tem permissão para visualizar Formulários.");
    }
    console.log(e);
    return { data: {}, errors: e }
  });

export default getForm;
