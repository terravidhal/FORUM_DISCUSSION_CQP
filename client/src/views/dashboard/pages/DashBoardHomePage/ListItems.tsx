import { useStudent } from "@/api/services";
import { UserType } from "@/datas/data";

interface ListItemsProps {
  user: UserType;
  order: number;
}

const ListItems = ({ user, order }: ListItemsProps) => {
  const { allStudents } = useStudent();
  const newAllStudents: any = allStudents || [];

  return (
    <>
      <div className="flex items-center">
        <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
          <img
            className="aspect-square h-full w-full"
            alt="Avatar"
            src={"/images/avatars/" + (order + 1) + ".png" || user.avatar}
          />
        </span>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            {newAllStudents[order]?.name || user.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {newAllStudents[order]?.email || user.email}
          </p>
        </div>
        <div className="ml-auto font-medium">
          +{newAllStudents[order]?.AudLogCertif?.length || user.balance}
        </div>
      </div>
    </>
  );
};

export default ListItems;
