import { TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import { Skeleton } from 'antd';

export default function Table({ columns, rows, rowCount, rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage, noNeedPagination, isRowsPerPage
}) {

  // Calculate the pagination details
  // const indexOfLastRow = (page+1) * rowsPerPage;
  // const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  // const currentItems = rows.slice(indexOfFirstRow, indexOfLastRow);
  const count = rowCount;
  const [isLoading, setIsLoading] = useState(false)

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

      <div className={`flex flex-col  pr-4 `}>
        <div className="flex flex-col shadow-md   overflow-auto z-0 border h-auto border-solid rounded-t-lg rounded-b-lg  bg-tableHeaderGray shadow-grey-200 border-tableBorderGray ">
          <table className="relative w-full ">
            <thead className="w-full h-0 text-xs bg-[#EAECF0] font-medium leading-4 tracking-normal text-textGray font-inter">
              <tr className="h-0">
                {columns.map((column, index) => (
                  <th key={index}>{column.name}</th>
                ))}
              </tr>
            </thead>
          </table>
          <div className="flex flex-col   shadow-md bg-tableHeaderGray shadow-grey-200 ">
            <table className="relative w-full h-full " style={{ fontSize: '12px' }}>
              <tbody className="w-full bg-white ">
                {isLoading && rows.length > 0 ? (
                  // Render skeleton loading for each row
                  Array.from({ length: rows.length }).map((_, index) => (
                    <tr key={index}>
                      {columns.map((column, index) => (
                        <td key={index} className="p-5 border-t-[1px]">
                          <Skeleton.Input size="small" shape="round" block="false" active />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  // Render actual data rows
                  rows.length > 0 ? rows.map((row, index) => (
                    <tr key={index}>
                      {columns.map((column, index) => (
                        <td
                          key={index}
                          className="  text-textGray py-2 border-t-[1px]"
                        >
                          {column.cell(row)}
                        </td>
                      ))}
                    </tr>
                  )) : <tr> <td className="text-textGray py-4 border-t-[1px] text-center">No Records found</td> </tr>
                )}

              </tbody>
            </table>
            <hr className="border-t-[1px] border-tableBorderGray" />

          </div>

        </div>
        {
          !noNeedPagination && <TablePagination
            sx={{ fontSize: "12px !important" }}
            component="div"
            count={count}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={!isRowsPerPage && [25, 50, 75, 100]}
          />
        }

      </div>
    </>
  );
}
