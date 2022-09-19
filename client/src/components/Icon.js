import { useState } from 'react';

export default function Icon({initIcon}){
    const [show, setShow] = useState(false);

    return <>
        {
            show ? 
            <div>
                <p style={{fontSize: "1.3rem"}}>{initIcon}</p>
                <div className='icon-container'></div>
            </div>
            :
            <p style={{fontSize: "2rem"}}>{initIcon}</p>
        }
    </>;
}