const getAdminPayloads = (user) => {
  console.log('user.app_id ', user.app_id)

  const payloads = [
    {
      "resource": {
        "question": 5
      },
      "params": {}
    },
    {
      "resource": {
        "question": 7
      },
      "params": {
        "app_id": user.app_id
      }
    },
  ]

  return payloads;
}

export default getAdminPayloads
  