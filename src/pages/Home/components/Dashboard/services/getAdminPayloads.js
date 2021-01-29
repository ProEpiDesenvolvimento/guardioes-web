const getAdminPayloads = (user) => {
  console.log('user.app_id ', user.app_id)

  const payloads = [
    {
      "resource": {
        "dashboard": 1
      },
      "params": {
        "app_id": user.app_id,
      }
    }
  ]

  return payloads;
}

export default getAdminPayloads