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
    console.log(e);
  });

export default deleteContent;
