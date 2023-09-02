import axios from "axios"



export const server = axios.create({
    baseURL: 'http://localhost:2580'
})
export const client = axios.create({
    baseURL: 'http://127.0.0.1:2580'
})

export const getData = async (url, query) => {
    console.log({ url })
    if (query) {
        url += `?${buildConditionFromQuery(query)}`
    }
    const response = await client.get(url)
    console.log({ response })
    if (response.status === 200)
        return response.data
    else{
        console.log('error')
    }
}

export const postData = async (url, options) => {
    const response = await client.post(url, options)
    
    return response
}

const buildConditionFromQuery = (query) => {
    const entries = Object.entries(query)
    const queryArray = entries.reduce((q, ent) => q = [...q, `${ent[0]}=${ent[1]}`], [])
    const queryString = queryArray.join('&')
    return queryString
}
