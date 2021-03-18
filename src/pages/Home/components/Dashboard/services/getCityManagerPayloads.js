const getCityManagerPayloads = (user) => {
    const payloads = [
        {
            "resource": {
                "dashboard": 6
            },
            "params": {
                "city": user.id
            }
        }
    ]

    return payloads;
}

export default getCityManagerPayloads
