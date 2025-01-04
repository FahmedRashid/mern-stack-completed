import { createContext, userReducer } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN': 
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({ children })=>{
    const [state, dispatch] = userReducer(authReducer, {
        user: null
    })

    console.log('AuthContext State: ', state)

    return(
        <AuthContext.provider value={{...state, dispatch}}>
            {children}
        </AuthContext.provider>
    )
}