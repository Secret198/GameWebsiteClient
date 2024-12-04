import { useRouteError } from "react-router-dom";


function ErrorPage() {

    return (
        <h1>404 Not found</h1>
    )
    // const error = useRouteError()

    // console.error(error)

    // return (
    //     <div>
    //         <h1>There is an error</h1>
    //         <p>{error.status}</p>
    //         <p>{error.data}</p>
    //         <p>{error.statusText}</p>
    //         <p>{error.message}</p>
    //     </div>
    // )
}

export default ErrorPage