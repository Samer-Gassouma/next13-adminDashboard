import { Heading } from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatter } from "@/lib/utils";
import { CreditCard, Package } from "lucide-react";
import { getTotalRevenue } from "@/actions/get-total-Revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import OverView from "@/components/overview";
import { getGraph } from "@/actions/get-graph";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);
  const graphData = await getGraph(params.storeId);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of the store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatter.format(totalRevenue)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="w-4 h-4 text-muted-foreground " />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Product In Stock
              </CardTitle>
              <Package className="w-4 h-4 text-muted-foreground " />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4"> 
            <CardHeader>
              <CardTitle>OverView</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <OverView data={graphData} />
              </CardContent>
          </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
