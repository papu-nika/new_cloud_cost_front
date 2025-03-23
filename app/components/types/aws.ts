import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

export const DEFAULT_REGION = "ap-northeast-1";

export const groupedRegions = [
  {
    area: "Asia Pacific",
    key: "ap",
    regions: [
      { label: "apsouth1", value: "ap-south-1" },
      { label: "apsouth2", value: "ap-south-2" },
      { label: "apnortheast1", value: "ap-northeast-1" },
      { label: "apnortheast2", value: "ap-northeast-2" },
      { label: "apnortheast3", value: "ap-northeast-3" },
      { label: "apsoutheast1", value: "ap-southeast-1" },
      { label: "apsoutheast2", value: "ap-southeast-2" },
      { label: "apsoutheast3", value: "ap-southeast-3" },
      { label: "apsoutheast4", value: "ap-southeast-4" },
      { label: "apeast1", value: "ap-east-1" },
    ],
  },
  {
    area: "North America",
    key: "na",
    regions: [
      { label: "useast1", value: "us-east-1" },
      { label: "useast2", value: "us-east-2" },
      { label: "uswest1", value: "us-west-1" },
      { label: "uswest2", value: "us-west-2" },
      { label: "cacentral1", value: "ca-central-1" },
      { label: "cawest1", value: "ca-west-1" },
      { label: "usgoveast1", value: "us-gov-east-1" },
      { label: "usgovwest1", value: "us-gov-west-1" },
    ],
  },
  {
    area: "South America",
    key: "sa",
    regions: [{ label: "saeast1", value: "sa-east-1" }],
  },
  {
    area: "Europe",
    key: "eu",
    regions: [
      { label: "euwest1", value: "eu-west-1" },
      { label: "euwest2", value: "eu-west-2" },
      { label: "euwest3", value: "eu-west-3" },
      { label: "eucentral1", value: "eu-central-1" },
      { label: "eucentral2", value: "eu-central-2" },
      { label: "eunorth1", value: "eu-north-1" },
      { label: "eusouth1", value: "eu-south-1" },
      { label: "eusouth2", value: "eu-south-2" },
      { label: "ilcentral1", value: "il-central-1" },
    ],
  },
  {
    area: "Africa",
    key: "af",
    regions: [{ label: "afsouth1", value: "af-south-1" }],
  },
  {
    area: "Middle East",
    key: "me",
    regions: [
      { label: "mecentral1", value: "me-central-1" },
      { label: "mesouth1", value: "me-south-1" },
    ],
  },
];
