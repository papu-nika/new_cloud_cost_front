import { NavLink, useNavigate } from "@remix-run/react";
import { navigationMenuTriggerStyle } from "app/components/ui/navigation-menu";
import { cn } from "app/lib/utils";
import { LoadingSpinner } from "app/components/ui/spinner";

type NavLinkButtonProps = {
  name: string;
  to: string;
};

export default function NavLinkButton(props: NavLinkButtonProps) {
  const navigate = useNavigate();

  return (
    <NavLink
      to={props.to}
      className={({ isActive }) =>
        isActive
          ? navigationMenuTriggerStyle() +
            " bg-primary text-background shadow-sm focus:bg-primary focus:text-background hover:bg-primary-hover"
          : navigationMenuTriggerStyle() + " shadow-sm"
      }
    >
      {({ isPending }) => (
        <>
          {isPending ? (
            <LoadingSpinner className="text-primary" />
          ) : (
            <span>{props.name}</span>
          )}
        </>
      )}
    </NavLink>
  );
}
