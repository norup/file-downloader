import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Button,
  Dropdown,
  Option,
  DropdownProps,
  Text,
} from "@fluentui/react-components";

export interface Column {
  columnKey: string;
  label: string;
}

export interface Item {
  [key: string]: any;
}

interface Props {
  columns: Column[];
  items: Item[];
  size: number;
  totalCount?: number;
  onChangeSize: (size: number) => void;
}

export const DataTable = ({
  columns,
  items,
  size,
  totalCount,
  onChangeSize,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = totalCount
    ? Math.ceil(totalCount / size)
    : Math.ceil(items.length / size);

  const paginatedItems = items.slice(
    (currentPage - 1) * size,
    currentPage * size
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleSizeChange: DropdownProps["onOptionSelect"] = (event, data) => {
    const newSize = parseInt(data.optionValue || size.toString(), 10);
    if (!isNaN(newSize)) {
      onChangeSize(newSize);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [size, items]);

  return (
    <div>
      <Dropdown value={size.toString()} onOptionSelect={handleSizeChange}>
        <Option value="5">5 rows per page</Option>
        <Option value="10">10 rows per page</Option>
        <Option value="20">20 rows per page</Option>
        <Option value="50">50 rows per page</Option>
      </Dropdown>

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell key={column.columnKey}>
                {column.label}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedItems.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.columnKey}>
                  <TableCellLayout truncate>
                    {item[column.columnKey]}
                  </TableCellLayout>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 30,
        }}
      >
        <Button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </Button>
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <Button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};
