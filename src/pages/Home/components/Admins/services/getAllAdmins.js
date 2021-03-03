import { api } from 'services/api';

const getAllAdmins = async (token) => api
    .get('/admins', {
        headers: {
            "Authorization": token,
        },
    }
    )
    .then(async (res) => {
        const { data } = res;
        return data;
    })
    .catch((e) => {
        if (e.response.data.error === "You are not authorized to access this page.") {
            alert("Você não tem permissão para visualizar Administradores.");
          }
        console.log(e);
        return { data: {}, errors: e }
    });


export default getAllAdmins;