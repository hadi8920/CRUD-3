const BASE_URL = "http://localhost:3000"

export async function registerUser(username : string  , email : string , password : string){

    try {
        const res = await fetch(`${BASE_URL}/api/auth/register` , {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({username , email , password})
        })
    
        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        throw error
    }

}

export async function loginUser(email : string , password : string){
    try {
        const res = await fetch(`${BASE_URL}/api/auth/login` , {
            method: "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({email , password})
        })
    
        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
    
        return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw error
    }
}