import api from 'services/api';

const getAllContents = async (token) => api
  .get('/contents', {
    headers: {
      "Authorization": token,
    },
  }
  )
  .then(async (res) => {
    const { data } = res;
    return data
  })
  .catch((e) => {
    if (e.response.data.error === "You are not authorized to access this page.") {
      alert("Você não pode ler os conteúdos")
    }
    console.log("status", e.response.data.error);
    return { data: {}, errors: e }
  });

export default getAllContents;
