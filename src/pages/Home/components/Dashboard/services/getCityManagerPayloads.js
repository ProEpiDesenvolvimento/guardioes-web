const getCityManagerPayloads = (user) => {
    const payloads = [
        {
            "resource": {
                "dashboard": 6
            },
            "params": {
                "group": user.id
            }
        }
    ]

    return payloads;
}

export default getCityManagerPayloads
