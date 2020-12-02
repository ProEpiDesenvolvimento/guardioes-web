import api from 'services/api';

const editGroupManager = async (id, data, token) => {
    await api.patch(`/group_managers/${id}`, data,
    {
        headers: {
            "Authorization": token,
        }
    }
    )
    .then(async (res) => {
        alert('Gerente de Instituição Editado!');
        const response = { data: res.data };
        return response;
    })
    .catch((e) => {
        if (e.response.data.error === "You are not authorized to access this page.") {
            alert("Você não tem permissão para editar Gerentes de Instituições.");
        } else {
            alert('Algo deu errado, tente novamente!');
        }
        console.log(e);
        return { data: {}, errors: e };
    });
}

export default editGroupManager;