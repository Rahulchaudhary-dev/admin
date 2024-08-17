import { NavigateFunction, useNavigate, To } from 'react-router-dom';

interface NavigateOptions {
  path: string;
  params?: Record<string, string | number>;
}

export const useNavigateToTop = () => {
  const navigate: NavigateFunction = useNavigate();

  const navigateAndReset = (to: To) => {
    navigate(to, { replace: false });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const refresh = () => {
    navigate(0);
    window.scrollTo(0, 0);
  };

  const goToUrl = ({ path, params = {} }: NavigateOptions) => {
    const searchParams = new URLSearchParams();
    let finaleUrl = path;
    if (Object.keys(params)?.length > 0) {
      Object.keys(params).forEach((key) => {
        searchParams.append(key, String(params[key]));
      });
      finaleUrl = `${path}?${searchParams.toString()}`;
    }

    navigate(finaleUrl);
    window.scrollTo(0, 0);
  };

  return { goto: navigateAndReset, refresh, goToUrl };
};

export default useNavigateToTop;