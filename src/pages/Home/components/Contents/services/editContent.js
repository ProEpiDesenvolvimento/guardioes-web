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
            alert('Conteúdo Editado!');
            const response = { data: res.data };
            return response;
        })
        .catch((e) => {
            alert('Algo deu errado, tente novamente!');
            console.log(e);
            return { data: {}, errors: e };
        });
}
export default editContent;