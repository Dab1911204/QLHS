import { router } from '../../routes';
import { useRoutes } from "react-router-dom";

function AllRoute() {
    const elements = useRoutes(router);
    return <>{elements}</>;
}

export default AllRoute;
