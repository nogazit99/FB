import React from 'react';
import ConnectLeft from '../ConnectionPage/ConnectLeft';
import ConnectRight from '../ConnectionPage/ConnectRight/ConnectRight';

function SignUpContainer({ setUsername }) {
    return (
        <div className="container-fluid text-center bg-secondary-subtle">
            <div className="row">
                <div className="col-12">
                    <div className="header bg-primary bg-opacity-75 shadow p-3 text-white py-4 " style={{ marginLeft: '-15px', marginRight: '-15px' }}>
                        <h1 className="fw-bold"> Join FooBar </h1>
                    </div>
                </div>
            </div>

            <div className="container text-center">
                <div className="row">
                    <div className="col-6">
                        <ConnectLeft />
                    </div>
                    <div className="col-6">
                        <ConnectRight formToShow="signup" setUsername={setUsername}  />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default SignUpContainer;