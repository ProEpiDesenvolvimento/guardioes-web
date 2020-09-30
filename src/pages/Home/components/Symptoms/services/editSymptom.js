import api from 'services/api';

const editSymptom = async (id, data, token) => {
        await api.patch(`/symptoms/${id}`, data,
        {
            headers: {
                "Authorization": token,
            }
        }
    )
        .then(async (res) => {
            alert('Sintoma Editado!');
            const response = { data: res.data };
            return response;
        })
        .catch((e) => {
            alert('Algo deu errado, tente novamente!');
            console.log(e);
            return { data: {}, errors: e };
        });
}

export default editSymptom;