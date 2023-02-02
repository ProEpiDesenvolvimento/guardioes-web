import api from 'services/api';

const deleteRumor = async (id, token) => api
  .delete(`/rumors/${id}`,{
            headers: {
                "Authorization": token,
            },                    
        }
    )
  .then(async (res) => {
    const { data } = res;
    alert("Rumor deletado")
    return data
  })
  .catch((e) => {
    if (e.response.data.error === "You are not authorized to access this page.") {
      alert("Você não tem permissão para deletar Rumores.");
    }
    console.log(e);
  });

export default deleteRumor;
