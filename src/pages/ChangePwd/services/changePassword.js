import api from 'services/api';

const changePassword = async (id, userType, token, password) =>
  api.patch(`/${userType}s/${id}`, 
    {
      [userType]: {
        password,
      }
    },
    {
      headers: {
        "Authorization": token,
      }
    }
  )
  .then(async (res) => {
    alert('Sua senha foi alterada!');
    const response = { data: res.data };
    return response;
  })
  .catch((e) => {
    alert(e);
    console.log(e);
    return { data: {}, errors: e };
  });

export default changePassword;