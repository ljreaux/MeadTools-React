import { useEffect, useState } from "react";

export const usePagination = (itemsPerPage: number, data: any[]) => {
  const [numberPerPage, setNumberPerPage] = useState(itemsPerPage);
  const [options, setOptions] = useState<{ label: string; value: number }[]>(
    []
  );

  useEffect(() => {
    const copy = [];
    for (let i = 5; i < data.length; i += 5) {
      copy.push({
        label: `${i}`,
        value: i,
      });
    }
    if (data.length > 5)
      copy.push({ label: data.length.toString(), value: data.length });
    setOptions(copy);
  }, [data.length]);

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + numberPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / numberPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * numberPerPage) % data.length;
    setItemOffset(newOffset);
  };
  return { handlePageClick, currentItems, pageCount, options, setNumberPerPage };
}