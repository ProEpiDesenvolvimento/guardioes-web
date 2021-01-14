const getGroupManagerPayloads = (user) => {
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
        "app_id": 3
      }
    },
  ]

  return payloads;
}

export default getGroupManagerPayloads
  