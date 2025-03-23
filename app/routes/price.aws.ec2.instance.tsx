import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Outlet, useLoaderData } from "@remix-run/react";
import { AxiosRequestConfig } from "axios";
import React from "react";
import { getAwsEc2Instances } from "~/client/default/default";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { InstanceTable } from "~/components/ui/InstanceTable";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import TotalPriceCard from "~/components/ui/TotalPriceCard";
import useTotalPriceStore from "~/hooks/priceStore";
import {
  AWSRegion,
  GetAwsEc2Instances200Item,
  GetAwsEc2InstancesParams,
} from "~/model";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const region = (url.searchParams.get("region") ||
    "ap-southeast-1") as unknown as AWSRegion;
  const os = url.searchParams.get("os");

  const queryParams: GetAwsEc2InstancesParams = {
    region: region,
  };

  const axiosOptions: AxiosRequestConfig = {
    baseURL: "http://localhost:8080",
  };

  console.log(region, os);

  const instances = (await getAwsEc2Instances(queryParams, axiosOptions)).data;
  return instances;
};

export default function Index() {
  const instances = useLoaderData<typeof loader>();
  const memoizedInstances = React.useMemo(() => instances, [instances]);

  const prices = useTotalPriceStore().selected;
  // const memoizedPrice = React.useMemo(() => prices, [prices]);

  return (
    <div className="flex w-full h-full">
      <Card className="h-fit m-4 py-4">
        {/* <CardContent> */}
        <InstanceTable data={memoizedInstances} />
        {/* </CardContent> */}
      </Card>
      <div className="flex flex-col w-[500px] h-full">
        <div className="h-72 my-4">
          <TotalPriceCard prices={prices} />
        </div>
        <div className="w-full h-1/3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
