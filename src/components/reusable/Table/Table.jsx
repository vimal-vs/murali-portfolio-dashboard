import { TablePagination } from "@mui/material";

export default function Table({
  columns,
  rows,
  rowCount,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  noNeedPagination,
  isRowsPerPage,
}) {
  const indexOfLastRow = (page + 1) * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentItems = rows.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
      <style>
        {`
    .overflow-y-auto::-webkit-scrollbar {
      width: 9px;
    }
    .overflow-y-auto::-webkit-scrollbar-thumb {
      background-color: rgba(155, 155, 155);
      border-radius: 10px;
    }
    .overflow-y-auto::-webkit-scrollbar-track {
      background-color: rgba(155, 155, 155, 0.1);
    }
  `}
      </style>
      <div className="flex flex-col pr-4">
        <div className="flex flex-col shadow-md overflow-auto z-0 border h-auto border-solid rounded-t-lg rounded-b-lg shadow-gray-200">
          <table className="relative w-full ">
            <thead className="w-full h-0 text-xs bg-[#EAECF0] font-medium leading-4 tracking-normal">
              <tr className="h-0">
                {columns.map((column, index) => (
                  <th key={index}>{column.name}</th>
                ))}
              </tr>
            </thead>
          </table>
          <div className="flex flex-col shadow-md shadow-grey-200 ">
            <table className="relative w-full h-full " style={{ fontSize: '12px' }}>
              <tbody className="w-full bg-white ">
                {currentItems?.length > 0 ? currentItems.map((row, index) => (
                  <tr key={index}>
                    {columns.map((column, index) => (
                      <td
                        key={index}
                        className="text-textGray py-2 border-t-[1px]"
                      >
                        {column.cell(row)}
                      </td>
                    ))}
                  </tr>
                )) : <tr> <td className="py-4 border-t-[1px] text-center">No Records found</td> </tr>
                }
              </tbody>
            </table>
            <hr className="border-t-[1px]" />
          </div>
        </div>
        {!noNeedPagination && <TablePagination
          sx={{ fontSize: "12px !important" }}
          component="div"
          count={rowCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={!isRowsPerPage && [5, 10, 20, 30]}
        />
        }
      </div>
    </>
  );
}
