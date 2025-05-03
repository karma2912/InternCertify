import { DataTableDemo } from "@/components/data-table/data-table";

export default function Home() {
  return (
    <div className="min-h-full border-2 border-black rounded-3xl p-6 w-full text-gray-700"  style={{ backgroundColor: "#FFFFE0" }}>
      <DataTableDemo/>
    </div>
  );
}