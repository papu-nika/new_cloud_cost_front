import { LoaderFunctionArgs } from "@remix-run/node";
import {
  getAwsEc2Instances,
  useGetAwsEc2Instances,
} from "~/client/default/default";

// export const loader = async ({ params, request }: LoaderFunctionArgs) => {
//   var instances = getAwsEc2Instances();
//   return {
//     props: {
//       instances,
//     },
//   };
// };

export default function Test() {
  const instances = useGetAwsEc2Instances();

  console.log(instances.data?.data);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="sr-only">Remix</span>
          </h1>
          <div className="h-[144px] w-[434px]">
            <img
              src="/logo-light.png"
              alt="Remix"
              className="block w-full dark:hidden"
            />
            <img
              src="/logo-dark.png"
              alt="Remix"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <div className="bg-black bg-opacity-10 dark:bg-opacity-10 rounded-xl p-4 w-full">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Instance Type</th>
                  <th>vCPU</th>
                  <th>Memory</th>
                  <th>Storage</th>
                  <th>On Demand Price</th>
                </tr>
              </thead>
              <tbody>
                {instances.data?.data?.map((instance) => (
                  <tr key={instance.id}>
                    <td>{instance.instancetype}</td>
                    <td>{instance.vcpu}</td>
                    <td>{instance.memory}</td>
                    {/* <td>{instance.storage}</td> */}
                    <td>{instance.ondemandprice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </nav>
      </div>
    </div>
  );
}
