import api from 'services/api';

const editApp = async (id, data, token) => {
    api.patch(`/apps/${id}`, data,
    {
      headers: {
        "Authorization": token,
      }
    }
  )
    .then(async (res) => {
      alert('App Editado!');
      const response = { data: res.data };
      return response;
    })
    .catch((e) => {
      alert('Algo deu errado, tente novamente!');
      console.log(e);
      return { data: {}, errors: e };
    });
}
export default editApp;