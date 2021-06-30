import api from 'services/api';

const getFilteredUsers = async (token, page, filters) => await api
  .post(`/user/filtered_list?page=${page}`, {
    filters,
  },
    {
      headers: {
        Authorization: `${token}`,
      }
    },
  )
  .then(async (res) => {
    const { data } = res;
    return data
  })
  .catch((e) => {
    alert(e.response.data.error);
    return { data: {}, errors: e }
  });

export default getFilteredUsers;

export const filtersSuffixList = [
  {label: "Igual a", key:"_eq" },
  {label: "Diferente de", key:"_not_eq" },
  {label: "Contém", key:"_cont" },
  {label: "Não contém", key:"_not_cont" },
  {label: "Menor que", key:"_lt" },
  {label: "Maior que", key:"_gt" },
]
