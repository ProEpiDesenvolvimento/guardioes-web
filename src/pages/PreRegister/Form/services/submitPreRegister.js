import api from 'services/api';

const submitPreRegister = async (data) =>
    api.post(`/pre_registers`, data)
        .then(async (res) => {
            const response = { data: res.data };
            return response
        })
        .catch((e) => {
            if (e.toString().includes("409"))
                return { data: {}, errors: "O email já está sendo usado." }
            return { data: {}, errors: e }
        });
export default submitPreRegister;
