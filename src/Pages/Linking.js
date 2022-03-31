import {useContext, useState} from 'react';
import { AuthContext } from '../Authentication/Authentication';
import { linkingPost } from '../Authentication/UserAuthentication';
import Unauthenticated from './Unauthenticated';

const Linking = (props) => {

    const [input, setInput] = useState();
    const {isAuthenticated, token, resetTokens} = useContext(AuthContext);

    const post = (event) => {
        event.preventDefault();
        let json = {
            "secretToken": input
        }
        linkingPost(props.server, json, token)
            .then(response => {
                if(response.status === 200) {
                    alert("Account linked. If you used wrong token, unlucky nothing happened.");
                    resetTokens();
                } else {
                    console.log("Something went horribly wrong linking account...")
                }
            })
    }

    if(!isAuthenticated) {
        return <Unauthenticated/>
    }
    return(<div className="form">
        <form onSubmit={post}>
            <p><label>Super secret token: </label><input type="text" onChange={e => setInput(e.target.value)}></input></p>
            <p><input className="btn btn-primary" type="submit" value="Try luck"></input></p>
        </form>
        
    </div>);
}

export default Linking;