export  const initialState={}


export const  reducer =(state,action) => {
    console.log(action)
    switch (action.type) {
        case "BLOG-PAGE":
            
        return {...state,user:action.user}
    

         case "SET-USER":return {
             ...state,isUser:action.isUser
         }
        default:return state
            
    }
}