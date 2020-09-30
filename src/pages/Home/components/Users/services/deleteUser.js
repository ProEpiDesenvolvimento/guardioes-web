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
    alert("Erro ao deletar usuário")
    console.log(e);
  });

export default deleteUser;
