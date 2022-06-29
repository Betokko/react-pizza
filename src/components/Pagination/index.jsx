import React from "react";
import ReactPaginate from "react-paginate";

import styles from './Pagination.module.scss'

const Pagination = () => {
  return (
    <ReactPaginate
    className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(evt) => console.log(evt)}
      pageRangeDisplayed={8}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
