const getAdminPayloads = (user) => {
  console.log('user.app_id ', user.app_id)

  const payloads = [
    {
      "resource": {
        "dashboard": 3
      },
      "params": {
        "app_id": 1,
        "app": 1,
      }
    }
  ]

  return payloads;
}

export default getAdminPayloads