type ApiResponse = {
  status: boolean;
  message: string;
  data: any;
  validate_error: any;
};
type ApiHandler = (res: ApiResponse) => void;
type Params = {
  resolve?: ApiHandler;
  resject?: ApiHandler;
  finally?: () => void;
  message?: (res: ApiResponse) => string | string;
  loading?: boolean;
};

/**
 * Custom hook for making API calls with additional control over loading and handling responses.
 *
 * @param {Params} commonParams - Common parameters for API calls.
 * @returns {Function} - A function that takes an API callback function and additional parameters to make an API call.
 * @hook
 *
 * @example
 * // Using the useApi hook to fetch data
 * const fetchData = useApi();
 *
 * //with callback
 * fetchData(
 *   () => $axios.get('/data'),
 *   {
 *     loading: false,
 *     resolve: (response) => {
 *       // Handle successful response
 *     },
 *     reject: (error) => {
 *       // Handle error response
 *     },
 *     finally: () => {
 *       // Perform final actions
 *     }
 *   }
 * );
 *
 * //with promise
 * fetchData(() => $axios.get('/data'), { loading: false})
 * .then((res) => {
 *    // Handle successful response
 * })
 * .catch((error) => {
 *    // Handle error response
 * })
 * .finally(() => {
 *    // Perform final actions
 * })
 */
const useApi = (commonParams: Params = { loading: true }) => {
  const { $emitter } = useNuxtApp();

  return (
    apiCb: () => Promise<ApiResponse>,
    params: Params = { loading: true }
  ) => {
    return new Promise((resolve: ApiHandler, reject: ApiHandler) => {
      commonParams.loading && params.loading && $emitter.emit('loading', true);
      apiCb()
        .then((res) => {
          if (res.status) {
            commonParams.resolve && commonParams.resolve(res);
            params.resolve && params.resolve(res);
            resolve(res);
            return;
          }

          commonParams.resject && commonParams.resject(res);
          params.resject && params.resject(res);
          reject(res);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          $emitter.emit('loading', false);
          commonParams.finally && commonParams.finally();
          params.finally && params.finally();
        });
    });
  };
};

export default useApi;
