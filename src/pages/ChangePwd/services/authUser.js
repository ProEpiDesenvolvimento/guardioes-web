import api from 'services/api';

const authUser = async (userType, email, password) =>
  api.post(`/${userType}/login`, { [userType]: { email, password } })
    .then(async (res) => {
      const response = { authorization: res.headers.authorization, status: res.status };
      return response
    })
    .catch((e) => {
      console.log(e);
      return { authorization: "", status: null }
    });

export default authUser;