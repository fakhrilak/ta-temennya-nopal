import Wrapper from "components/Wrapper"
import React,{useEffect, useState} from "react"
import {connect} from "react-redux"

const Profile=({login})=>{
    const [user,setUser] = useState({})
    useEffect(()=>{
        setUser(localStorage.getItem('dataUser'))
    },[user])

    console.log("ini user",user)
    return(
        <Wrapper title="Profile">
            <div className="flex flex-col max-w-xs m-2 bg-white px-8 py-6 rounded-xl space-y-5 items-center shadow-lg">
                <h3 className="font-serif font-bold text-gray-900 text-xl">{user.email}</h3>
                <p className="self-start">
                <p className="self-start font-bold text-lg"> {user.phoneNumber}</p>
        
                <p className="self-start my-0">Stock: </p>
                </p>
                <div className="w-full py-4 bg-gray-900 rounded-md text-white text-sm focus:border-transparent">
                    <p>{user.name}</p>
                </div>

            </div>
        </Wrapper>
        
    )
}

export default Profile