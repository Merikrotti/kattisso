import {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../Authentication/Authentication";
import Unauthenticated from './Unauthenticated';

const Landing = (props) => {
    
    const {isAuthenticated, userData, setUserDataf} = useContext(AuthContext);

    if(!isAuthenticated) {
        return <Unauthenticated/>
    }
    if(userData === undefined) {
        setUserDataf();
        return (<div>
            <p>Still loading user data...</p>
        </div>)
    }
    return(<div>
        <h1>Landing</h1>
        <h3>Hello, {userData.name}</h3>
        <h3>Your roles are: </h3>
        <ul>
        {userData.roles.length !== 0 ? userData.roles.map((item, index) => {
            return <li key={item+index}>{item.split(": ")[1]}</li>
        }) : <li>None</li>}
        </ul>
        <Link to="/rolelist"><h3>View all roles</h3></Link>
    </div>);
}

export default Landing;