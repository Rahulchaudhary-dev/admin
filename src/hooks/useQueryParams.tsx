import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

type QueryParamTypes = string | number | boolean;

interface DefaultQueryParamTypes {
  [key: string]: QueryParamTypes;
}

function useQueryParams<T extends DefaultQueryParamTypes>(): T {
  const { search } = useLocation();

  return useMemo(() => {
    const searchParams = new URLSearchParams(search);
    const params: Record<string, unknown> = {};

    // Provides speific type to each value
    searchParams.forEach((value, key) => {
      if (!isNaN(Number(value))) {
        params[key] = Number(value);
      } else if (value.toLowerCase() === 'true') {
        params[key] = true;
      } else if (value.toLowerCase() === 'false') {
        params[key] = false;
      } else {
        params[key] = value;
      }
    });

    return params as T;
  }, [search]);
}

export default useQueryParams;
