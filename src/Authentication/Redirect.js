import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

const Redirect = (props) => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    useEffect(() => {
        props.setRedirect(searchParams.get("source"));
        navigate("/login");
    }, [navigate, searchParams]);

    return (<h1>Creating a redirected login...</h1>)
}

export default Redirect;