export default function MessagePersonCard({ photo, name }) {
  return (
    <>
      <div className="flex items-center gap-2 text-medium font-semibold">
        <div className="relative">
          <div className="overflow-hidden rounded-full w-[30px] h-[30px] border-2 border-blue-500">
            <img
              className="object-cover w-full h-full"
              src={photo}
              alt={"friend"}
            />
          </div>
          <span className="absolute w-2.5 h-2.5 right-0 bottom-0 bg-green-500 rounded-full z-10"></span>
        </div>
        <p>{name}</p>
      </div>
    </>
  );
}
