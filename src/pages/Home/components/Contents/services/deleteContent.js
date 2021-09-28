import api from 'services/api';

const deleteContent = async (id, token) => api
  .delete(`/contents/${id}`,{
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
      alert("Você não tem permissão para deletar Conteúdos.");
    }
  });

export default deleteContent;
