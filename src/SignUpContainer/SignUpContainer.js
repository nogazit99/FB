import React from 'react';
import ConnectLeft from '../ConnectionPage/ConnectLeft';
import ConnectRight from '../ConnectionPage/ConnectRight/ConnectRight';

function SignUpContainer({ usersData,setUsersData, setUsername }) {
    return (
       <div className="container text-center">
       <div className="row">
           <div className="col">
             <ConnectLeft />
           </div>
           <div className="col">
           <ConnectRight formToShow="signup" usersData={usersData} setUsersData={setUsersData} setUsername={setUsername} />
           </div>
       </div>
   </div>

    );
}

export default SignUpContainer;