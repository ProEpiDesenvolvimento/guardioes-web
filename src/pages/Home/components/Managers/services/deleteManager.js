import api from 'services/api';

const deleteManagers = async (id, token) => api
  .delete(`/managers/${id}`, {
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
    console.log(e);
  });

export default deleteManagers;
