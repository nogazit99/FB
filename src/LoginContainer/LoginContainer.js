import React from 'react';
import ConnectLeft from '../ConnectionPage/ConnectLeft';
import ConnectRight from '../ConnectionPage/ConnectRight/ConnectRight';

function LoginContainer({ usersData,setUsersData , setUsername }) {
    return (
        <div className="container-fluid text-center  ">
             <div className="row">
                <div className="col-12">
                <header className="bg-primary text-white py-4" style={{ marginLeft: '-15px', marginRight: '-15px' }}> {/* Adjusted margin to pull header closer to the left edge */}
                        <h1>Welcome to FooBar !</h1>
                    </header>
                </div>
            </div>
            
            <div className="row">
                <div className="col">
                    <ConnectLeft />
                </div>
                <div className="col">
                    <ConnectRight formToShow="login" usersData={usersData} setUsersData={setUsersData} setUsername={setUsername} />
                </div>
            </div>
        </div>
    );
}

export default LoginContainer;
