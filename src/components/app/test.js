import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { input_username } from "../../slices"
import { Modal_add_contract } from '../../modals/contract-modals';

export const Test = () => {
    const dispatch = useDispatch()
    return <div>
             <Modal_add_contract />
           </div>
}
