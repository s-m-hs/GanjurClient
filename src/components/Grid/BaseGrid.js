import { AgGridReact } from 'ag-grid-react';
import React from 'react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

const BaseGrid = React.forwardRef((props, ref) => {
    return (
        <div className="ag-theme-material" style={{ height: '100%', width: props.tableWidth ? props.tableWidth : "98%", fontSize: props.fontSize ? props.fontSize : null }}>
            <AgGridReact
                ref={ref}
                rowData={props.rowData}
                columnDefs={props.colDefs}
                defaultColDef={{
                    sortable: true,
                    filter: true,
                    resizable: true,
                    maxWidth: props.maxWidth,
                    suppressHeaderMenuButton: true,

                }}
                // ✅ rowSelection حذف شد - تداخل ایجاد میکرد
                onGridReady={(params) => {
                    params.api.sizeColumnsToFit();
                }}

                cellSelection={true}
                enableCellTextSelection={true}
                enableRtl={props.rtl}
                pagination
                paginationPageSize={1000}
                animateRows={true}
            />
        </div>
    );
});

BaseGrid.displayName = 'BaseGrid';

export default BaseGrid;
