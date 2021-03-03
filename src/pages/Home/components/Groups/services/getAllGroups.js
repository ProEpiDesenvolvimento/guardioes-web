import { api } from 'services/api';

const getAllGroups = async (token) =>
  api.get(`/groups`, {
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
      alert("Você não tem permissão para visualizar Instituições.");
    }
    console.log(e);
    return { data: {}, errors: e }
  });

export default getAllGroups;
