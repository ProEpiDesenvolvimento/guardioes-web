const GetPayloads = (user) => {

  console.log('USER DATA ', user);

  const payloads = [
    {
      "resource": {
        "question": 5
      },
      "params": {}
    },
    {
      "resource": {
        "question": 4
      },
      "params": {}
    },
  ]

  return payloads;
}

export default GetPayloads
  