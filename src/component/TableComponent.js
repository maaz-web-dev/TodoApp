// import React from 'react';
// import { useTable } from 'react-table';
// const TableComponent = ({ columns, data }) => {
//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         rows,
//         prepareRow,
//       } = useTable({ columns, data });
    
//       return (
//         <table {...getTableProps()} style={{ borderCollapse: 'collapse', width: '100%' }}>
//           <thead>
//             {headerGroups.map(headerGroup => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map(column => (
//                   <th
//                     {...column.getHeaderProps()}
//                     style={{
//                       borderBottom: '2px solid black',
//                       background: 'aliceblue',
//                       padding: '8px',
//                       textAlign: 'left',
//                     }}
//                   >
//                     {column.render('Header')}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {rows.map(row => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()} style={{ borderBottom: '1px solid black' }}>
//                   {row.cells.map(cell => (
//                     <td
//                       {...cell.getCellProps()}
//                       style={{
//                         padding: '8px',
//                         textAlign: 'left',
//                       }}
//                     >
//                       {cell.render('Cell')}
//                     </td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       );
    
//     };

// export default TableComponent;
import React from 'react';
import { useTable } from 'react-table';

const TableComponent = ({ columns, data, handleEditClick, handleDeleteClick }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: '2px solid black',
                  background: 'aliceblue',
                  padding: '8px',
                  textAlign: 'left',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} style={{ borderBottom: '1px solid black' }}>
              {row.cells.map(cell => (
                <td
                  {...cell.getCellProps()}
                  style={{
                    padding: '8px',
                    textAlign: 'left',
                  }}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// export default TableComponent;
export default TableComponent;
