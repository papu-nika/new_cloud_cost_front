import { Outlet, useSearchParams } from "@remix-run/react";

export default function Index() {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
}
