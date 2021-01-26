const getGroupManagerPayloads = (user) => {
  const payloads = [
    {
      "resource": {
        "question": 35
      },
      "params": {
        "group_id": user.group_id
      }
    }
  ]

  return payloads;
}

export default getGroupManagerPayloads
  