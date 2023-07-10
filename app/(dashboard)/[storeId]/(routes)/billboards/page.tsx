import React from "react";
import { BillboardsClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";
export default async function BillboardsPage({params}:{params:{storeId:string}}) {
  const billboards = await prismadb.billboard.findMany({
    where : {
      storeId : params.storeId
    },
    orderBy : {
      createdAt : "desc"
    }
  });

  const formattedBillboards:BillboardColumn[] = billboards.map((billboard) => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: format(billboard.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardsClient  data={formattedBillboards}/>
      </div>
    </div>
  );
}
 