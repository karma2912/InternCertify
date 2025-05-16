"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DatePickerWithRange } from "../ui/date-picker";
import { useState } from "react";





export type Payment = {
  id: string;
  stipend: number;
  name: string;
  doj: string;
  email: string;
  doe: string;
  intern: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border-black"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-black"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Full Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "doj",
    header: () => <div className="text-center">Date of Join</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("doj")}</div>,
  },
  {
    accessorKey: "doe",
    header: () => <div className="text-center">Date of End</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("doe")}</div>,
  },
  {
    accessorKey: "intern",
    header: () => <div className="text-center">Position</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("intern")}</div>
    ),
  },
  {
    accessorKey: "stipend",
    header: () => <div className="text-right">Stipend</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("stipend"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy Intern ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableDemo() {
  const [data, setData] = useState<Payment[]>([]);
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/fetchInterns');
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.log("Got an error")
      }
    };

    fetchData();
  }, []);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    intern: "",
    stipend: "",
    doj: "19-Jan-2023",
    doe: "19-Mar-2023"
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const addIntern = async() => {

    const tempId = `temp-${Date.now()}`;
    try {
    setData(prev => [...prev, {
      id: tempId,
      ...formData,
      stipend: Number(formData.stipend)
    }]);

    const res = await fetch('/api/addInterns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error('Failed to save intern');

    const savedIntern = await res.json();
    
    setData(prev => prev.map(item => 
      item.id === tempId ? { ...savedIntern, id: savedIntern._id } : item
    ));

    setOpen(false);
    setFormData({
      name: "",
      email: "",
      intern: "",
      stipend: "",
      doj: "19-Jan-2023",
      doe: "19-Mar-2023"
    });

     toast.custom((t) => (
        <div className="bg-white border border-green-500 text-green-700 p-4 rounded-lg shadow-md font-medium">
          ✅ Intern added successfully!
        </div>
      ));
  } catch (err) {
    setData(prev => prev.filter(item => item.id !== tempId));
    toast.custom((t) => (
        <div className="bg-white border border-red-500 text-red-700 p-4 rounded-lg shadow-md font-medium">
          ❌ Failed to add intern. Please try again.
        </div>
      ));
  }
  };
  return (
    <div className="w-full ">
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border-black"
        />
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto hover:bg-yellow-500  hover:border-yellow-500 bg-yellow-400 border-yellow-400 text-black m-2"
              >
                + Add Intern
              </Button>
            </DialogTrigger>

            <DialogContent className="w-[450px] bg-yellow-50 text-black">
              <DialogHeader>
                <DialogTitle>Add Intern</DialogTitle>
                <DialogDescription>
                  Add the correct details of intern.
                </DialogDescription>
              </DialogHeader>
              <form className="mt-4">
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name" className="text-black">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Name of intern"
                      className="bg-white text-black border border-black/10"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email" className="text-black">
                      Email
                    </Label>
                    <Input
                      id="email"
                      placeholder="Email of intern"
                      className="bg-white text-black border border-black/10"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <DatePickerWithRange />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework" className="text-black">
                      Position
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, intern: value })
                      }
                    >
                      <SelectTrigger
                        id="framework"
                        className="bg-white text-black border border-black/10"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent
                        position="popper"
                        className="bg-white text-black"
                      >
                        <SelectItem value="Web Development">Web Development</SelectItem>
                        <SelectItem value="Android Development">
                          Android Development
                        </SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                        <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="number" className="text-black">
                      Stipend
                    </Label>
                    <Input
                      id="number"
                      placeholder="Stipend of intern in RUPEE"
                      className="bg-white text-black border border-black/10"
                      type="number"
                      value={formData.stipend}
                      onChange={(e) =>
                        setFormData({ ...formData, stipend: e.target.value })
                      }
                    />
                  </div>
                </div>
              </form>
              <DialogFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={addIntern}>Add</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto hover:bg-yellow-500 hover:border-yellow-500 bg-yellow-400 border-yellow-400 text-black m-2"
              >
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-black hover:bg-yellow-500 hover:border-yellow-500 bg-yellow-400 border-yellow-400"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="text-black hover:bg-yellow-500 hover:border-yellow-500 bg-yellow-400 border-yellow-400 hover:pointer-coarse"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
