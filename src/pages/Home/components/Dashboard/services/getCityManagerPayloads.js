const getCityManagerPayloads = (user) => {
    const payloads = [
        {
            "resource": {
                "dashboard": 6
            },
            "params": {
                "city": user.city
            }
        }
    ]

    return payloads;
}

export default getCityManagerPayloads
