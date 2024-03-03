import React from 'react';
import ConnectLeft from '../ConnectionPage/ConnectLeft';
import ConnectRight from '../ConnectionPage/ConnectRight/ConnectRight';

function LoginContainer({ setUsername, setToken }) {
    return (
        <div className="container-fluid text-center bg-secondary-subtle">
             <div className="row">
                <div className="col-12">
                <div className="header bg-primary bg-opacity-75 shadow p-3 text-white py-4 ">
                        <h1 className="fw-bold"> Welcome to FooBar !</h1>
                    </div>
                </div>
            </div>
            
            <div className="row">
                <div className="col-6 ">
                    <ConnectLeft />
                </div>
                <div className="col-6 ">
                    <ConnectRight formToShow="login" setUsername={setUsername} setToken={setToken} />
                </div>
            </div>
        </div>
    );
}


export default LoginContainer;
