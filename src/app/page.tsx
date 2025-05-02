import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


export default function Home() {
  const invoices = [
    {
      name: "Yash",
      doj: "11 Jan 2025",
      doe:"11 Mar 2025",
      email:"rajakyash@gmail.com",
      intern: "Software Developer",
      stipend: "Free",
    },
    {
      name: "Salman",
      doj: "17 Jan 2025",
      doe:"17 Mar 2025",
      email:"khansalman@gmail.com",
      intern: "MS Word",
      stipend: "Free",
    },
    {
      name: "Ania",
      doj: "6 Jan 2025",
      doe:"6 Mar 2025",
      email:"forgerania@gmail.com",
      intern: "Data Analyst",
      stipend: "Free",
    },
    {
      name: "Rohit",
      doj: "09 Feb 2025",
      doe:"09 Apr 2025",
      email:"shettyrohit@gmail.com",
      intern: "Android",
      stipend: "Free",
    },
    {
      name: "Abdul",
      doj: "19 Feb 2025",
      doe:"19 Apr 2025",
      email:"rehmanabdul@gmail.com",
      intern: "Data Scientist",
      stipend: "Free",
    },
    {
      name: "Arpita",
      doj: "13 Feb 2025",
      doe:"13 Apr 2025",
      email:"hulearpita@gmail.com",
      intern: "Data Analytics",
      stipend: "Free",
    },
    {
      name: "Vandana",
      doj: "11 Jan 2025",
      doe:"11 Apr 2025",
      email: "narangvandana@gmail.com",
      intern: "Web Development",
      stipend: "Free",
    },
  ];

  return (
    <>
      <div className="h-[75vh] w-[80vw] bg-black text-white fixed border-2 p-4 border-white rounded-3xl">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Intern</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.name}>
                <TableCell className="font-medium">{invoice.name}</TableCell>
                <TableCell>{invoice.doj}</TableCell>
                <TableCell>{invoice.doe}</TableCell>
                <TableCell>{invoice.email}</TableCell>
                <TableCell>{invoice.intern}</TableCell>
                <TableCell className="text-right">
                  {invoice.stipend}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell className="text-right">Free</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}
