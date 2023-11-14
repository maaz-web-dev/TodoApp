import React from "react";
import Button from "@mui/material/Button";

function Footer({ add, page, setPage, data, itemsPerPage }) {
  const buttonClass = "custom-button";

  return (
    <>
      <div className="footer">
        <Button variant="contained" color="primary" onClick={add}>
          Add
        </Button>
      </div>
      {data.length > itemsPerPage && (
        <div className={buttonClass}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            className={buttonClass}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPage(page + 1)}
            disabled={page >= Math.ceil(data.length / itemsPerPage) - 1}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}

export default Footer;