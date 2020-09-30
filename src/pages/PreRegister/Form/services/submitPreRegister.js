import api from 'services/api';

const submitPreRegister = async (data) =>
    api.post(`/pre_registers`, data)
        .then(async (res) => {
            const response = { data: res.data };
            return response
        })
        .catch((e) => {
            alert('Algo deu errado, tente novamente!');
            console.log(e);
            return { data: {}, errors: e }
        });
export default submitPreRegister;
