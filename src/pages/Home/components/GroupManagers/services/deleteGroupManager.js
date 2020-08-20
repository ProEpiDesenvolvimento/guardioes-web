import api from 'services/api';

const deleteGroupManagers = async (id, token) => api
  .delete(`/group_managers/${id}`, {
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

export default deleteGroupManagers;
