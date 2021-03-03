import { api } from 'services/api';

const deleteSyndrome = async (id, token) =>
    api.delete(`/syndromes/${id}`, {
        headers: {
            "Authorization": token,
        },
    }
    )
    .then(async (res) => {
        const { data } = res;
        alert("Syndrome Deletada!");
        return data;
    })
    .catch((e) => {
        if (e.response.data.error === "You are not authorized to access this page.") {
            alert("Você não tem permissão para deletar Síndromes.");
        }
        console.log(e);
    });

export default deleteSyndrome;