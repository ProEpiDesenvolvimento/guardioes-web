const getGroupManagerPayloads = (user) => {
  const payloads = [
    {
      "resource": {
        "dashboard": 5
      },
      "params": {
        "group": user.id
      }
    }
  ]

  return payloads;
}

export default getGroupManagerPayloads
  