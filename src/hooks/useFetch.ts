//useFetch.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | any>(null);

  useEffect(() => {
    setLoading(true)
    setData(null);
    setError(null);
    const source = axios.CancelToken.source();
    axios.get(url, { cancelToken: source.token })
      .then(res => {
        setLoading(false);
        res.data && setData(res.data);
      })
      .catch(err => {
        setLoading(false)
        setError(err)
      })
    return () => {
      source.cancel();
    }
  }, [url])

  return { data, loading, error }
}
export default useFetch;
