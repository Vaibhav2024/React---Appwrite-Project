import React, { useState } from "react";
import { UserContext } from "./UserContext.js";

const UserContextProvider = (props) => {
    const [user, setUser] = useState(null)
    const value = {
        user,
        setUser
    }

    return(
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider