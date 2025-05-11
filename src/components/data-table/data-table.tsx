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

const data: Payment[] = [
  {
    id: "txn001",
    stipend: 3860,
    name: "Yash Rajak",
    email: "yash.rajak@gmail.com",
    doj: "14-Nov-2023",
    doe: "14-Feb-2024",
    intern: "Software Developer",
  },
  {
    id: "txn002",
    stipend: 4790,
    name: "Salman Khan",
    email: "salman.khan@gmail.com",
    doj: "30-Jul-2022",
    doe: "30-Oct-2022",
    intern: "Frontend Developer",
  },
  {
    id: "txn003",
    stipend: 3280,
    name: "Aisha Verma",
    email: "aisha.verma@gmail.com",
    doj: "12-Jan-2024",
    doe: "12-May-2024",
    intern: "Data Analyst",
  },
  {
    id: "txn004",
    stipend: 4230,
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    doj: "18-Jun-2023",
    doe: "18-Sep-2023",
    intern: "Backend Developer",
  },
  {
    id: "txn005",
    stipend: 5000,
    name: "Priya Singh",
    email: "priya.singh@gmail.com",
    doj: "04-Mar-2022",
    doe: "04-Jun-2022",
    intern: "UI/UX Designer",
  },
  {
    id: "txn006",
    stipend: 3375,
    name: "Amit Patel",
    email: "amit.patel@gmail.com",
    doj: "21-Sep-2024",
    doe: "21-Nov-2024",
    intern: "QA Engineer",
  },
  {
    id: "txn007",
    stipend: 4930,
    name: "Neha Kapoor",
    email: "neha.kapoor@gmail.com",
    doj: "10-Feb-2023",
    doe: "10-Jun-2023",
    intern: "Cloud Computing",
  },
  {
    id: "txn008",
    stipend: 4405,
    name: "Vikram Jain",
    email: "vikram.jain@gmail.com",
    doj: "07-Aug-2023",
    doe: "07-Nov-2023",
    intern: "Cybersecurity",
  },
  {
    id: "txn009",
    stipend: 3895,
    name: "Deepika Nair",
    email: "deepika.nair@gmail.com",
    doj: "25-Oct-2022",
    doe: "25-Jan-2023",
    intern: "Database Administrator",
  },
  {
    id: "txn010",
    stipend: 4120,
    name: "Arjun Rathore",
    email: "arjun.rathore@gmail.com",
    doj: "16-May-2023",
    doe: "16-Jul-2023",
    intern: "DevOps",
  },
  {
    id: "txn011",
    stipend: 3610,
    name: "Kiran Mehta",
    email: "kiran.mehta@gmail.com",
    doj: "22-Mar-2024",
    doe: "22-Jul-2024",
    intern: "Machine Learning",
  },
  {
    id: "txn012",
    stipend: 4800,
    name: "Manish Gupta",
    email: "manish.gupta@gmail.com",
    doj: "11-Apr-2023",
    doe: "11-Jul-2023",
    intern: "Product Management",
  },
  {
    id: "txn013",
    stipend: 3950,
    name: "Sonali Mishra",
    email: "sonali.mishra@gmail.com",
    doj: "19-Dec-2022",
    doe: "19-Mar-2023",
    intern: "AI Research",
  },
  {
    id: "txn014",
    stipend: 3685,
    name: "Rohit Iyer",
    email: "rohit.iyer@gmail.com",
    doj: "27-Jan-2023",
    doe: "27-May-2023",
    intern: "Blockchain",
  },
  {
    id: "txn015",
    stipend: 4500,
    name: "Ananya Reddy",
    email: "ananya.reddy@gmail.com",
    doj: "05-Jul-2024",
    doe: "05-Sep-2024",
    intern: "Full Stack Developer",
  },
];

const handleIntern = () => {
  console.log("Handle Intern is being clicked");
};

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
              Copy payment ID
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
          <Dialog>
            <DialogTrigger>
              <Button
                variant="outline"
                className="ml-auto hover:bg-yellow-500  hover:border-yellow-500 bg-yellow-400 border-yellow-400 text-black m-2"
              >
                + Add Intern
              </Button>
            </DialogTrigger>
            
            <DialogContent className="w-[450px] bg-yellow-50 text-black">
      <DialogHeader>
        <DialogTitle>Create project</DialogTitle>
        <DialogDescription>Deploy your new project in one-click.</DialogDescription>
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
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <DatePickerWithRange />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework" className="text-black">
                      Position
                    </Label>
                    <Select>
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
                        <SelectItem value="Web">Web Development</SelectItem>
                        <SelectItem value="Android">Android Development</SelectItem>
                        <SelectItem value="Science">Data Science</SelectItem>
                        <SelectItem value="Analyst">Data Analyst</SelectItem>
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
                    />
                  </div>
                </div>
              </form>
      <DialogFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Add</Button>
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
