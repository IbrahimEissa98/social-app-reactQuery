import { Button } from "@heroui/react";

export default function SuggestedFriendsCard({ photo, name, friendsNum }) {
  return (
    <>
      <div className="flex items-center gap-2 text-medium font-semibold relative group">
        <div className="overflow-hidden rounded-full w-[35px] h-[35px] border-2 border-blue-500">
          <img
            className="object-cover w-full h-full"
            src={photo}
            alt={"friend"}
          />
        </div>
        <div className="">
          <p>{name}</p>
          <p className="text-xs font-medium text-gray-500">
            {friendsNum} mutual friends
          </p>
        </div>
        <div className="hidden absolute right-1.5 top-1/2 -translate-y-1/2 group-hover:block">
          <Button color="primary" className="m-0! min-w-fit h-fit p-2 ">
            Add
          </Button>
        </div>
      </div>
    </>
  );
}
