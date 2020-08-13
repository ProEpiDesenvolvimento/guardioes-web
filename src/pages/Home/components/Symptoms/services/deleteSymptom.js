import api from 'services/api';

const deleteSymptoms = async (id, token) => api
  .delete(`/symptoms/${id}`, {
    headers: {
      "Authorization": token,
    },
  }
  )
  .then(async (res) => {
    const { data } = res;
    // alert("Sintoma deletado")
    return data
  })
  .catch((e) => {
    console.log(e);
  });

export default deleteSymptoms;
