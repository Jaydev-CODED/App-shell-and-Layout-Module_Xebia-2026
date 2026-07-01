import React, { useState } from "react";
import Pagination from "../ui/Pagination";
import Input from "../ui/Input";
import Button from "../ui/Button";
import "./Table.css";

export interface DataTableColumn<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  // Sorting
  onSort?: (key: string, direction: "asc" | "desc") => void;
  // Pagination
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  totalEntries?: number;
  entriesPerPage?: number;
  // Row actions
  onRowActionClick?: (row: T, event: React.MouseEvent) => void;
  isLoading?: boolean;
}

export default function DataTable<T extends { id: string | number }>({
  columns,
  data,
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  onSort,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalEntries = 0,
  entriesPerPage = 10,
  onRowActionClick,
  isLoading = false,
}: DataTableProps<T>) {
  const [internalSearch, setInternalSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (onSearchChange) {
      onSearchChange(val);
    } else {
      setInternalSearch(val);
    }
  };

  const currentSearchValue = searchValue !== undefined ? searchValue : internalSearch;

  const handleSortClick = (key: string) => {
    let nextDirection: "asc" | "desc" = "desc";
    if (sortKey === key) {
      nextDirection = sortDirection === "desc" ? "asc" : "desc";
    }
    setSortKey(key);
    setSortDirection(nextDirection);
    if (onSort) {
      onSort(key, nextDirection);
    }
  };

  // Filter and sort internally if handlers not provided
  const getProcessedData = () => {
    let result = [...data];

    // Filter
    if (currentSearchValue && !onSearchChange) {
      result = result.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(currentSearchValue.toLowerCase())
        )
      );
    }

    // Sort
    if (sortKey && !onSort) {
      result.sort((a, b) => {
        const valA = a[sortKey as keyof T];
        const valB = b[sortKey as keyof T];
        if (valA === undefined || valA === null || valB === undefined || valB === null) return 0;
        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  };

  const processedData = getProcessedData();

  // Pagination summary details
  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries || processedData.length);
  const finalTotal = totalEntries || processedData.length;

  return (
    <div className="datatable-container border border-surface-card rounded-xl overflow-hidden bg-background">
      {/* Table Toolbar */}
      {(onSearchChange || !onSearchChange) && (
        <div className="datatable-toolbar p-4 border-b border-surface-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-bright/50">
          <div className="relative w-full sm:w-72">
            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={currentSearchValue}
              onChange={handleSearchChange}
              className="datatable-search"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="secondary" size="sm" className="datatable-filter-btn">
              <span className="material-symbols-outlined text-[16px] text-text-secondary">
                filter_list
              </span>
              Filter
              <span className="material-symbols-outlined text-[16px] text-text-secondary">
                expand_more
              </span>
            </Button>
          </div>
        </div>
      )}

      {/* Table grid */}
      <div className="overflow-x-auto">
        <table className="datatable w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-surface-card">
              {columns.map((col) => {
                const isSortedCol = sortKey === col.key;
                return (
                  <th
                    key={col.key as string}
                    className={`py-3 px-4 font-label-sm text-label-sm text-text-secondary whitespace-nowrap group ${
                      col.sortable ? "cursor-pointer hover:text-on-background" : ""
                    }`}
                    onClick={() => col.sortable && handleSortClick(col.key as string)}
                  >
                    <div className="flex items-center gap-1">
                      {col.header}
                      {col.sortable && (
                        <span
                          className={`material-symbols-outlined text-[14px] transition-opacity ${
                            isSortedCol
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-100"
                          } ${
                            isSortedCol && sortDirection === "asc"
                              ? "rotate-180"
                              : ""
                          }`}
                        >
                          arrow_downward
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
              {onRowActionClick && (
                <th className="py-3 px-4 font-label-sm text-label-sm text-text-secondary text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F4F4F7]">
            {isLoading ? (
              // Loader overlay or skeleton
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={`skeleton-${idx}`}>
                  <td colSpan={columns.length + (onRowActionClick ? 1 : 0)} className="py-6 px-4">
                    <div className="flex gap-4 animate-pulse">
                      <div className="w-8 h-8 rounded-full bg-surface-variant shrink-0" />
                      <div className="flex-1 space-y-2 mt-1">
                        <div className="h-3 bg-surface-variant rounded w-1/3" />
                        <div className="h-2 bg-surface-variant rounded w-1/4" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : processedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onRowActionClick ? 1 : 0)}
                  className="py-8 px-4 text-center text-text-secondary font-body-md"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              processedData.map((row) => (
                <tr key={row.id} className="hover:bg-surface-bright/50 transition-colors group">
                  {columns.map((col) => (
                    <td key={col.key as string} className="py-3 px-4">
                      {col.render ? (
                        col.render(row)
                      ) : (
                        <span className="font-body-md text-body-md text-on-background">
                          {String(row[col.key as keyof T] ?? "")}
                        </span>
                      )}
                    </td>
                  ))}
                  {onRowActionClick && (
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => onRowActionClick(row, e)}
                        className="p-1 text-text-secondary hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 bg-transparent border-none cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          more_vert
                        </span>
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination control footer */}
      {onPageChange && (
        <div className="datatable-footer p-4 border-t border-surface-card flex items-center justify-between bg-background">
          <span className="font-body-sm text-body-sm text-text-secondary">
            Showing {startEntry} to {endEntry} of {finalTotal} entries
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
