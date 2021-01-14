const getManagerPayloads = (user) => {
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
        "app_id": 2
      }
    },
  ]

  return payloads;
}

export default getManagerPayloads
  