import api from 'services/api';

const createForm = async (data, token) =>
  api.post(`/forms`, data, {
    headers: {
      "Authorization": token,
    }
  })
  .then(async (res) => {
    alert('Criado com sucesso!');
    const response = { data: res.data, status: res.status };
    return response
  })
  .catch((e) => {
    if (e.response.data.error === "You are not authorized to access this page.") {
      alert("Você não tem permissão para criar Formulários.");
    } else {
      alert('Algo deu errado, tente novamente!');
    }      
    console.log(e);
    return { data: {}, errors: e }
  });

export default createForm;
