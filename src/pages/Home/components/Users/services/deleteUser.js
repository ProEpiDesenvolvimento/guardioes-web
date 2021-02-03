import api from 'services/api';

const deleteUser = async (id, token) => api
  .delete(`/users/${id}`,{
            headers: {
                "Authorization": token,
            },                    
        }
    )
  .then(async (res) => {
    const { data } = res;
    alert("Conteudo deletado")
    return data
  })
  .catch((e) => {
    if (e.response.data.error === "You are not authorized to access this page.") {
      alert("Você não tem permissão para deletar Usuários.");
    }
    console.log(e);
  });

export default deleteUser;
