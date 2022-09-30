import api from 'services/api';

const editContent = async (id, data, token) => {
        await api.patch(`/contents/${id}`, data, 
        {
            headers: {
                "Authorization": token,
            }
        }
    )
        .then(async (res) => {
            alert('Dica Editado!');
            const response = { data: res.data };
            return response;
        })
        .catch((e) => {
            if (e.response.data.error === "You are not authorized to access this page.") {
                alert("Você não tem permissão para editar Dicas.");
            } else {
                alert('Algo deu errado, tente novamente!');
            }
            console.log(e);
            return { data: {}, errors: e };
        });
}
export default editContent;