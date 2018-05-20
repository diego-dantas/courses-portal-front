import React from 'react';

import NavBar       from './../../bar/NavBar';
import NavDashboard from './NavDashboard';


import Routers from './../../../../service/router/Routers';


const StudentDashboard = (props) => {
    
    const dash = Routers.get(props.match.params.way);

    if (!dash) 
    {
        return <div><h1>404 Not Found</h1></div>
    }

    return(
        <div>
            <NavBar />
            <div className="container" style={{marginTop: '100px'}}>
                <div className="row">
                    <div className="col-sm-12 col-md-3 col-lg-3 border border-secondary">
                        <NavDashboard />
                    </div>
                    <div className="col-sm-12 col-md-9 col-lg-9 border border-secondary" style={{paddingTop: '20px'}}>
                        <dash.item />
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default StudentDashboard; 

