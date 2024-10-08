import { useEffect, useState, useCallback } from "react";
import { Header } from "../../components/Header";
import { Column, DataTable, Item } from "./components/DataTable";
import { get } from "idb-keyval";
import { useLocation } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { parseCSV } from "./helpers/parseCSV";

export const TablePage = () => {
  const location = useLocation();
  const { totalLines } = location.state || {};

  const [tableSize, setTableSize] = useState<number>(10);

  const [columns, setColumns] = useState<Column[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const csvData = await get("cachedFile");

      if (csvData) {
        const { parsedColumns, parsedItems } = parseCSV(csvData);
        setColumns(parsedColumns);
        setItems(parsedItems);
      }
    } catch (error) {
      console.error("Error fetching CSV from IndexedDB:", error);
    } finally {
      setLoading(false);
    }
  }, [setColumns, setItems, setLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return loading ? (
    <Loading />
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header />
      <DataTable
        columns={columns}
        items={items}
        size={tableSize}
        onChangeSize={setTableSize}
        totalCount={totalLines}
      />
    </div>
  );
};
