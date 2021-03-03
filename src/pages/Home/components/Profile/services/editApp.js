import { api } from 'services/api';

const editApp = async (id, data, token) => {
    await api.patch(`/apps/${id}`, data,
    {
        headers: {
            "Authorization": token,
        },
    }
    )
    .then(async (res) => {
        const { data } = res;
        return data
    })
    .catch((e) => {
        console.log(e);
        return { data: {}, errors: e };
    });
}
export default editApp;