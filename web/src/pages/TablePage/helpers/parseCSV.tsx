import { Column, Item } from "../components/DataTable";

export const parseCSV = (csvData: string) => {
  if (!csvData) {
    throw new Error("CSV data is empty or undefined.");
  }

  const lines = csvData.split("\n").map((line) => line.trim());

  if (lines.length === 0) {
    throw new Error("CSV contains no data.");
  }

  const headers = lines[0].split(",").map((header) => header.trim());

  if (headers.length === 0) {
    throw new Error("CSV headers are missing.");
  }

  const parsedColumns: Column[] = headers.map((header) => ({
    columnKey: header,
    label: header.charAt(0).toUpperCase() + header.slice(1),
  }));

  const parsedItems: Item[] = lines.slice(1).map((line) => {
    const values = line.split(",").map((value) => value.trim());

    const item: Item = headers.reduce<Item>((acc, header, index) => {
      acc[header] = values[index] !== undefined ? values[index] : null;
      return acc;
    }, {});

    return item;
  });

  return { parsedColumns, parsedItems };
};
