import { useMutation } from "@tanstack/react-query";
import { postRequest } from "@utils/api";

type OutputData = Object;
type InputProps = Object;

const exampleEndpoint = async (props?: InputProps) => {
    const response = await postRequest('/example', { ...props });

    return response?.data as OutputData;
};

function useMutationHookExample() {
    return useMutation({
        mutationKey: ['exampleEndpoint'],
        mutationFn: (props?: InputProps) => exampleEndpoint(props),
    });
}

export default useMutationHookExample