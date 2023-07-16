import React from 'react';
import {useNavigate} from "react-router-dom";

const Navigate = ({url}) => {
    const navigate = useNavigate();
    navigate(url);

    return (
        <div>
        </div>
    );
}

export default Navigate;
