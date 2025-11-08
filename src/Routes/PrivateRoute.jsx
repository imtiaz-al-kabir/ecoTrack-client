import React, { use } from 'react';
import { Navigate } from "react-router";

const PrivateRoute = ({children}) => {

const {user,loading}=use(Aut)

    return <Navigate to='/login'></Navigate>
        
    ;
};

export default PrivateRoute;