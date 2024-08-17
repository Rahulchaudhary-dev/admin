import { useQuery } from "@tanstack/react-query";
import { getRequest, } from "@utils/api";

type OutputData = Object;

const exampleEndpoint = async () => {
    const response = await getRequest('/example');
    return response?.data as OutputData;
};

function useQueryHookExample() {
    return useQuery({
        queryKey: ['exampleEndpoint'],
        queryFn: () => exampleEndpoint(),
    });
}

export default useQueryHookExample