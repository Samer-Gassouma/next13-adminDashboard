"use client";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { SizeColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
interface SizesClientProps {
  data: SizeColumn[];
}
export const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Sizes(${data.length})`}
          description="Sizes are the main way to display your content."
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable  searchKey="name" columns={columns} data={data} />
      <Heading
        title="API"
        description="API is a way to connect your content to your Sizes."
      />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};
