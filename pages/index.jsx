import { useState, useEffect } from 'react';

import { userService } from 'services';

export default Home;

function Home() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
    }, []);

    return (
        <div className="card mt-4">
            <h4 className="card-header">You're logged in with Next.js 11 & JWT!!</h4>
            <div className="card-body">
                <h6>Users from secure api end point</h6>
                {users &&
                    <ul>
                        {users.map(user =>
                            <div style={{borderBottom:'1px solid black'}}><li key={user.id}>Name : {user.username}</li><li>Email: {user.email}</li></div>
                        )}
                    </ul>
                }
                {!users && <div className="spinner-border spinner-border-sm"></div>}
            </div>
        </div>
    );
}
