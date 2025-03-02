import { useCallback, useState } from "react";

function usePages(length, limit = 5) {
  const [page, setPage] = useState(0);
  const onPageReset = useCallback(() => setPage(0), []);

  const onPageUp = useCallback(() => {
    if ((page + 1) * limit < length) {
      setPage(page + 1);
    }
  }, [page, length, limit]);

  const onPageDown = useCallback(() => {
    if (page > 0) {
      setPage(page - 1);
    }
  }, [page]);

  return {
    page: {
      from: page * limit + 1,
      to: Math.min((page + 1) * limit),
      length
    },
    onPageReset,
    onPageUp,
    onPageDown
  };
}

export default usePages;
