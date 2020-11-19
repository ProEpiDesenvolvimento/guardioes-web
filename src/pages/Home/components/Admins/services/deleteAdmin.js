import api from 'services/api';

const deleteAdmin = async (id, token) => {
    await api.delete(`/admin/${id}`, {
        headers: {
            "Authorization": token,
        },
    }
    )
    .then(async (res) => {
        const { data } = res;
        alert("Admin deletado!");
        return data;
    })
    .catch((e) => {
        alert("Algo deu errado, tente novamente!");
        console.log(e);
    });
}

export default deleteAdmin;