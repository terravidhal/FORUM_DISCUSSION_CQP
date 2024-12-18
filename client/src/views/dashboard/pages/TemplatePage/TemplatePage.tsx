import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, FileUp, ListFilter } from "lucide-react";
import FormTemplate from "./FormTemplate";
import ToggleView from "./ToggleView";
import { useTemplates } from "@/api/services";
import pathImage from "@/constants/pathImage";





interface CollectionCardProps {
  name: string;
  storageSize: string;
  documents: string;
  avgDocumentSize: string;
  indexes: number;
  totalIndexSize: string;
}

const CollectionCard = ({ name, storageSize, documents, avgDocumentSize, indexes, totalIndexSize }: CollectionCardProps) => {
  return (
    <div className="bg-white aspect-square  rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-medium text-green-700 mb-4">{name}</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Storage size:</span>
          <span>{storageSize}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Documents:</span>
          <span>{documents}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Avg. document size:</span>
          <span>{avgDocumentSize}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Indexes:</span>
          <span>{indexes}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total index size:</span>
          <span>{totalIndexSize}</span>
        </div>
      </div>
    </div>
  );
};




const TemplatePage = () => {

  const {
    allTemplates,
  } = useTemplates();

  return (
    <>
      <div className="flex items-center justify-between space-y-2 p-4">
        {/* <h2 className="text-3xl font-bold tracking-tight">Templates</h2> */}
        <div className="flex items-center space-x-2">
          <Label htmlFor="levelStudent" className="text-right text-gray-600">
                sort by
              </Label>
          <Select defaultValue={"Template Name"} name="levelStudent">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Template Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>Level</SelectLabel> */}
                    <SelectItem value="Template Name">Template Name</SelectItem>
                    <SelectItem value="2">Avg. document size</SelectItem>
                    <SelectItem value="3">Storage size</SelectItem>
                    <SelectItem value="4">Indexes</SelectItem>
                    <SelectItem value="5">Total index size</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
          <button className="p-1.5 border rounded-md">
          <ArrowDownNarrowWide className="h-4 w-4 text-gray-600" />
          </button>
          <button className="p-1.5 border rounded-md">
          <ArrowDownNarrowWide className="h-4 w-4 text-gray-600" />
          </button>
        </div>
       
          
        <div className="flex items-center space-x-2">
          <div className="grid gap-2">
            {/* <Button>view</Button> */}
            <ToggleView />
          </div>
          <FormTemplate />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-5">
          {
          //Array.from({ length: 20 }).map((_, i) => (
            allTemplates?.map((elt:any) => (
             <div key={elt._id} className="aspect-square rounded-3xl bg-cyan-600 shadow-sm  hover:shadow-md transition-shadow" >
               <img className="h-full w-full rounded-3xl" src={pathImage+elt.previewImage} alt="" />
             </div>
          //   <CollectionCard
          //   key={i}
          //   name="activities"
          //   storageSize="61.44 kB"
          //   documents="1.5 K"
          //   avgDocumentSize="119.00 B"
          //   indexes={1}
          //   totalIndexSize="77.82 kB"
          // />
          ))}
        </div>
      </div>
    </>
  );
};

export default TemplatePage;
