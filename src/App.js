// // App.js

// import React from 'react';
// import Navbar from './NavBar';

// const App = () => {
//   return (
//     <div>
//       <Navbar />
//       {/* Your other content */}
//     </div>
//   );
// };

// export default App;

// App.js

import React from 'react';
import Navbar from './NavBar';
import Menu from './Menu';
import './style.css'; // Import your CSS file

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <Menu />
          </div>
          <div className="col-9">
            column
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
