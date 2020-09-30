import api from 'services/api';

const getAllGroups = async (token, id) => {
  const response =  await api.get('/groups?group_manager=true',
                                {
                                  headers: {
                                    "Authorization": token,
                                  },
                                }
                    )
  return response.data
}

export default getAllGroups;
