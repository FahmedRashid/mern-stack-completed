import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"
export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const {dispatch : workoutDispatch} = useWorkoutsContext() // this will prevent the browser to hold the previous login state to show when a new user login. 
    const logout = () =>{
        //remove user from storage.
        localStorage.removeItem('user')
        
        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        workoutDispatch({type: 'SET_WORKOUTS', payload: null}) // this will prevent the browser to hold the previous login state to show when a new user login. 
    }
    return {logout}
}