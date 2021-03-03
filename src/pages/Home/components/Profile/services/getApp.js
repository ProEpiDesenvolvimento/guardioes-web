import { api } from 'services/api';

const getApp = async (id, token) => 
    await api.get(`/apps/${id}`,
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

export default getApp;