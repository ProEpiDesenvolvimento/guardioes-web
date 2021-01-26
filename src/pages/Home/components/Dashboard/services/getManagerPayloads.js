const getManagerPayloads = (user) => {
  const payloads = [
    {
      "resource": {
        "dashboard": 3
      },
      "params": {
        "app_id": user.app_id,
        "app": user.app_id,
      }
    }
  ]

  return payloads;
}

export default getManagerPayloads
  