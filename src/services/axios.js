import axios from "axios"



export const server=axios.create({
    baseURL:'http://localhost:2580'
})
export const client = axios.create({
    baseURL: 'http://127.0.0.1:2580'
})

export const getData = async (url) => {
    const response = await client.get(url)
    return response.data
}

export const postData = async (url, options) => {
    const response = await client.post(url, options)
    if (response.status >= 400) {
        return false
    }
    return response.data
}
