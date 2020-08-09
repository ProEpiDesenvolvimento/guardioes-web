import api from 'services/api';

const getAllApps = async (token) => api
  .get('/apps',{
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
  });

export default getAllApps;
