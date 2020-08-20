import api from 'services/api';

const createGroupManagers = async (data, token) =>
  api.post(`/group_managers`, data,
    {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwic2NwIjoiYWRtaW4iLCJhdWQiOm51bGwsImlhdCI6MTU5NzI2MTc5NCwiZXhwIjoxNTk5ODkxNTQwLCJqdGkiOiJjYjZjZmNlNC1kOWQ3LTQ5OTAtYjE5NS05YjllMTM5ZjNmMzAifQ.ctPtvipCDYP90JXkukbzwtJluEn-H9_HEH_hZXuDsto",
      }
    }
  )
    .then(async (res) => {
      const response = { data: res.data };
      return response
    })
    .catch((e) => {
      alert('Algo deu errado, tente novamente!');
      console.log(e);
      return { data: {}, errors: e }
    });
export default createGroupManagers;