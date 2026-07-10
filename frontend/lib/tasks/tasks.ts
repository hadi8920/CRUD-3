const BASE_URL = "http://localhost:3000"

export async function createTask(title : string , description : string , status : string , priority : string){
    try {
        console.log("inside controler")
        const token = await localStorage.getItem("token")
        const res = await fetch(`${BASE_URL}/api/task/create_task` , {
            method : "POST",
            headers : {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({title , description , status , priority})
        })

        console.log("inside controler2 ")
        console.log("res" , res)
    
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

export async function getTasks(
    priority : string,
    sort : string , 
    order : string
){
    try {
        const params = new URLSearchParams()

        if(priority){
            params.append("priority", priority )
        }
        if(sort){
            params.append("sort" , sort)
        }
        if(order){
            params.append("order" , order)
        }
        const token = await localStorage.getItem("token")
        const url = `${BASE_URL}/api/task/get_all_task?${params.toString()}`
        const res = await fetch(url  ,{
            method : "GET",
            headers : {
                "Authorization" : `Bearer ${token}`
            },
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

export async function deleteTask(id:string){
    try {
        const token = await localStorage.getItem("token")
        const res = await fetch(`${BASE_URL}/api/task/delete_task/${id}` ,{
            method : "DELETE",
            headers : {
                "Authorization" : `Bearer ${token}`
            }
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

export async function getTask(id : string){
    try {
        const token = await localStorage.getItem("token")
        const res = await fetch(`${BASE_URL}/api/task/get_task/${id}` , {
            method : "GET",
            headers : {
                "Authorization" : `Bearer ${token}`
            }
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

export async function updateTask(id :string , title : string , description : string , status : string , priority : string ){
    try {
        console.log("----------inside the frontend controller")
        const token = await localStorage.getItem("token")
        const res = await fetch(`${BASE_URL}/api/task/update_task/${id}` , {
            method : "PATCH",
            headers : {
                "Authorization" : `Bearer ${token}`,
                "Content-type" : "application/json"
            },
            body : JSON.stringify({title  , description , status , priority })
        })
        const data = await res.json()
        console.log("----------inside the frontend controller")
        console.log(data.message , "data.message in the frontend controller")
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        throw error
    }
}