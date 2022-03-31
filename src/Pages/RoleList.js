import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Authentication/Authentication";
import { getAllRoles } from "../Authentication/UserAuthentication";
import Unauthenticated from "./Unauthenticated";
import "../PageCss/RoleListStyle.css";

const RoleList = (props) => {
    const {isAuthenticated, token} = useContext(AuthContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        if(!isAuthenticated)
            return;
        getAllRoles(props.server, token)
            .then(response => {
                if(response.status === 200) {
                    response.json()
                        .then(json => {
                            
                            setData(json);
                        })
                }
            })
    }, [isAuthenticated, setData, props.server])

    if(!isAuthenticated) {
        return <Unauthenticated/>
    }

    if(data.length < 1)
        return <p>Loading...</p>
    
    return (<div className="tablecontainer">
        <table>
            <tbody>
                <tr>
                    <th>Role Name</th>
                    <th>Comment</th>
                </tr>
            
            {data.roles.map((item, index) => (
                <tr key={index}>
                    <td key={item.name + index}>{item.name}</td>
                    <td key={item.comment + index}>{item.comment}</td>
                </tr>)
                )}
            </tbody>
        </table>
    </div>)
}

export default RoleList