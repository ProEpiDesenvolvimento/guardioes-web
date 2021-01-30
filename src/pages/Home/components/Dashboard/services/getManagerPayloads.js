const getManagerPayloads = (user) => {
  const payloads = [
    {
      "resource": {
        "dashboard": 1
      },
      "params": {
        "app": user.app_id,
      }
    }
  ]

  return payloads;
}

export default getManagerPayloads
  