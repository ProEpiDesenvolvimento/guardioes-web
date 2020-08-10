import api from 'services/api';

const createApp = async (data, token) =>
  api.post(`/apps`, data,
    {
      headers: {
        "Authorization": token,
      }
    }
  )
    .then(async (res) => {
      alert('App criado!');
      const response = { data: res.data };
      return response
    })
    .catch((e) => {
      alert('Algo deu errado, tente novamente!');
      console.log(e);
      return { data: {}, errors: e }
    });
export default createApp;