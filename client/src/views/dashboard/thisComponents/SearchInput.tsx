import { useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/icons";
import { Search } from "lucide-react";

const SearchInput = () => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  function searchAction(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);

    let value = formData.get("q") as string;
    let params = new URLSearchParams({ q: value });
    startTransition(() => {
      navigate(`/?${params.toString()}`);
    });
  }

  return (
    <form onSubmit={searchAction} className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
      <Input
        name="q"
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
      {isPending && <Spinner color="" />}
    </form>
  );
};

export default SearchInput;
