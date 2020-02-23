import React from 'react'
import { Route, Redirect } from 'react-router-dom'
const PrivateRoute = (props) => {
    const isUserLoggedIn = props.isUserLoggedIn;
    const Component = props.component
    const otherPros = { ...props }

    if (isUserLoggedIn) {
        return  <Route {...otherPros} component={Component}/>
    }
    return <Redirect to='/' />
}

export default PrivateRoute