import api from 'services/api';

const getAllApps = async (token) => api
  .get('/apps', {
    headers: {
      "Authorization": token,
    },
  }
  )
  .then(async (res) => {
    const { data } = res;
    console.log(data)
    return data
  })
  .catch((e) => {
    if (e.response.data.error === "You are not authorized to access this page.") {
      alert("Você não tem permissão para visualizar Apps.");
    }
    console.log(e);
    return { data: {}, errors: e }
  });

export default getAllApps;
