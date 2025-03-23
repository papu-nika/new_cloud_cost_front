import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Outlet, useLoaderData } from "@remix-run/react";
import { AxiosRequestConfig } from "axios";
import {
  getAwsEc2Instances,
  getAwsEc2InstancesInstanceSku,
} from "~/client/default/default";
import { InstanceTable } from "~/components/ui/InstanceTable";
import {
  AWSRegion,
  GetAwsEc2Instances200Item,
  GetAwsEc2InstancesInstanceSku200,
  GetAwsEc2InstancesParams,
} from "~/model";
import invariant from "tiny-invariant";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { Label } from "~/components/ui/label";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const id = params.id;
  invariant(id, "id is required");

  const axiosOptions: AxiosRequestConfig = {
    baseURL: "http://localhost:8080",
  };

  const instances = (await getAwsEc2InstancesInstanceSku(id, axiosOptions))
    .data;
  return instances;
};

export default function Index() {
  const instance = useLoaderData<typeof loader>();

  const specs = [
    {
      title: "Basic Information",
      row: [
        { name: "Instance Type", value: instance.instance_type },
        { name: "OS", value: instance.os },
        { name: "Region", value: instance.region },
        { name: "vCPU", value: instance.vcpu },
        { name: "Memory", value: instance.memory + " GiB" },
        { name: "Storage", value: instance.storage },
        { name: "GPU", value: instance.gpu_memory + " GiB" },
        { name: "Ondemand Price", value: instance.ondemand_price + " USD / h" },
      ],
    },
    {
      title: "Performance",
      row: [
        { name: "Network Performance", value: instance.networkper_formance },
        {
          name: "Dedicated EBS Throughput",
          value: instance.dedicatedebs_throughput,
        },
        { name: "Processor Architecture", value: instance.physical_processor },
        { name: "Processor Features", value: instance.processor_features },
        { name: "Clock Speed", value: instance.clockspeed },
      ],
    },
    {
      title: "Pricing",
      row: [
        { name: "Ondemand Price", value: instance.ondemand_price + " USD / h" },
        {
          name: "1year RI Price(standard)",
          value: instance.one_year_reserved_standard_price + " USD / 1year",
        },
        {
          name: "1year RI Price(convertible)",
          value: instance.one_year_reserved_convertible_price + " USD / 1year",
        },
        {
          name: "3year RI Price(standard)",
          value: instance.three_year_reserved_standard_price + " USD / 3year",
        },
        {
          name: "3year RI Price(convertible)",
          value:
            instance.three_year_reserved_convertible_price + " USD / 3year",
        },
      ],
    },
  ];

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Instance Details</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 h-4/5 mb-4 mr-4 overflow-auto">
        {specs.map((spec) => (
          <div key={spec.title}>
            <Label>{spec.title}</Label>
            <Table>
              <TableBody>
                {spec.row.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font-sans text-[12px] py-1">
                      {row.name}
                    </TableCell>
                    <TableCell className="font-light text-[12px] py-1">
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
