import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { input_username } from "../../slices"


const TestReduxToolkit = () => {
    const dispatch = useDispatch()
    return <div>
        Testing Redux-Toolkit
        <input onChange={
        
        (event) => {
            event.preventDefault()
            dispatch(input_username(event.target.value))
        }
    }/>

    </div>
}

export default TestReduxToolkit