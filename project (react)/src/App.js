import "./App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-alpine.css";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";

function App() {
  const gridRef = useRef();

  const [rowData, setRowData] = useState([
    { make: "Ford", model: "focus", price: 40000 },
    { make: "Toyota", model: "Celice", price: 45000 },
    { make: "BMW", model: "4 Series", price: 50000 },
  ]);

  const [columnDefs, setColumnDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  const cellClickedListener = useCallback((e) => {
    console.log("cellClicked", e);
  });

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  const pushMeClicked = useCallback((e) => {
    gridRef.current.api.deselectAll();
  });

  return (
    <div className="ag-theme-alpine" style={{ height: "90vh" }}>
      <AgGridReact
        ref={gridRef}
        onCellClicked={cellClickedListener}
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection="multiple"
        animateRows={true}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}

export default App;
