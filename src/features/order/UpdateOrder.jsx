import { useFetcher, useLoaderData } from "react-router-dom";

import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

// This component is going to be used to update the order data in the react-router-dom server
// But without the need to reload the pageb or navigate to another page
function UpdateOrder({ order }) {
    const fetcher = useFetcher();

    return (
        <fetcher.Form method="PATCH" className="text-right" >
            <Button type="primary">Make priority</Button>
        </fetcher.Form>   
    );
}

export default UpdateOrder;

// React-router action function
export async function action({ request, params }) {
    const data = { priority: true };
    await updateOrder(params.orderId, data);
    return null
}