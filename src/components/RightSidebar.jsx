import profilePlaceholder from "../assets/images/profile-placeholder.jpg";
import MessagePersonCard from "./MessagePersonCard";
import SuggestedFriendsCard from "./SuggestedFriendsCard";

export default function RightSidebar() {
  return (
    <>
      {/* Messages */}
      <div
        className={`w-full text-gray-700 dark:text-white bg-white dark:bg-post-dark shadow-sm rounded-md p-5 flex flex-col`}
      >
        <div className="flex justify-between items-center mb-1 border-b-1 border-divider pb-2">
          <h3 className="text-lg font-bold">Messages</h3>
          <i className="fa-solid fa-pen-to-square cursor-pointer"></i>
        </div>
        <div className="flex flex-col gap-2 *:flex *:items-center *:gap-3 pb-5 *:cursor-pointer *:hover:bg-gray-200 *:dark:hover:bg-slate-800 *:p-2 *:rounded-xl">
          <MessagePersonCard
            name={"Mohamed Salah"}
            photo={
              "https://imgs.search.brave.com/eyRY5uaiLGM5frGLLGO6FeKUxOITJRXh-mf56aSPzWY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWd2/My5mb3Rvci5jb20v/aW1hZ2VzL2hvbWVw/YWdlLWZlYXR1cmUt/Y2FyZC9mb3Rvci0z/ZC1hdmF0YXIuanBn"
            }
          />
          <MessagePersonCard
            name={"Menna Mohamed"}
            photo={
              "https://imgs.search.brave.com/KvhUiSA7KjTu64dSUQK-WfJcKEBXOpqE5m7RosyO4Jc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzM5MTUyMTIzL3Iv/aWwvMmY3MDVlLzU4/NTAxOTE2NzIvaWxf/NjAweDYwMC41ODUw/MTkxNjcyX2RjMXMu/anBn"
            }
          />
          <MessagePersonCard
            name={"Mohamed Ahmed"}
            photo={
              "https://imgs.search.brave.com/7wamrHp5ct-lHlg7J_MPX6FQQlqkEqYYXV0IutoKWAc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC8w/MS84My9jYXJ0b29u/LWF2YXRhci1vZi1h/LXlvdW5nLWdhbWVy/LW1hbi12ZWN0b3It/NTc2MjAxODMuanBn"
            }
          />
          <MessagePersonCard
            name={"Aya Ahmed"}
            photo={
              "https://imgs.search.brave.com/KvhUiSA7KjTu64dSUQK-WfJcKEBXOpqE5m7RosyO4Jc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzM5MTUyMTIzL3Iv/aWwvMmY3MDVlLzU4/NTAxOTE2NzIvaWxf/NjAweDYwMC41ODUw/MTkxNjcyX2RjMXMu/anBn"
            }
          />
          <MessagePersonCard name={"Eyad Emad"} photo={profilePlaceholder} />
          <MessagePersonCard
            name={"Mohamed Eissa"}
            photo={
              "https://imgs.search.brave.com/VWu3w2mXEXF-24jUf_MxHz9BfaB0UQWgcfzFS4inWoY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJ1cGxvYWQv/MzkwODU4MjkvZmls/ZS9vcmlnaW5hbC00/MDE1MWZhOTc5MGVm/ZTJiNWI4YWU5MzBl/YjI4NmFmOC5qcGc_/Zm9ybWF0PXdlYnAm/cmVzaXplPTQwMHgz/MDAmdmVydGljYWw9/Y2VudGVy"
            }
          />
          <MessagePersonCard
            name={"Ahmed Salah"}
            photo={
              "https://imgs.search.brave.com/7wamrHp5ct-lHlg7J_MPX6FQQlqkEqYYXV0IutoKWAc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC8w/MS84My9jYXJ0b29u/LWF2YXRhci1vZi1h/LXlvdW5nLWdhbWVy/LW1hbi12ZWN0b3It/NTc2MjAxODMuanBn"
            }
          />
        </div>
      </div>

      {/* Suggested Friends */}
      <div
        className={`w-full text-gray-700 dark:text-white bg-white dark:bg-post-dark shadow-sm rounded-md p-5 flex flex-col mt-3`}
      >
        <div className="flex justify-between items-center mb-1 border-b-1 border-divider pb-2">
          <h3 className="text-lg font-bold">Suggested Friends</h3>
        </div>
        <div className="flex flex-col gap-2 *:flex *:items-center *:gap-3 pb-5 *:cursor-pointer *:hover:bg-gray-200 *:dark:hover:bg-slate-800 *:p-2 *:rounded-xl">
          <SuggestedFriendsCard
            name={"Mohamed Ahmed"}
            photo={
              "https://imgs.search.brave.com/7wamrHp5ct-lHlg7J_MPX6FQQlqkEqYYXV0IutoKWAc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC8w/MS84My9jYXJ0b29u/LWF2YXRhci1vZi1h/LXlvdW5nLWdhbWVy/LW1hbi12ZWN0b3It/NTc2MjAxODMuanBn"
            }
            friendsNum={18}
          />
          <SuggestedFriendsCard
            name={"Mohamed Salah"}
            photo={
              "https://imgs.search.brave.com/eyRY5uaiLGM5frGLLGO6FeKUxOITJRXh-mf56aSPzWY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWd2/My5mb3Rvci5jb20v/aW1hZ2VzL2hvbWVw/YWdlLWZlYXR1cmUt/Y2FyZC9mb3Rvci0z/ZC1hdmF0YXIuanBn"
            }
            friendsNum={5}
          />
          <SuggestedFriendsCard
            name={"Aya Ahmed"}
            photo={
              "https://imgs.search.brave.com/KvhUiSA7KjTu64dSUQK-WfJcKEBXOpqE5m7RosyO4Jc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzM5MTUyMTIzL3Iv/aWwvMmY3MDVlLzU4/NTAxOTE2NzIvaWxf/NjAweDYwMC41ODUw/MTkxNjcyX2RjMXMu/anBn"
            }
            friendsNum={10}
          />
          <SuggestedFriendsCard
            name={"Eyad Emad"}
            photo={profilePlaceholder}
            friendsNum={6}
          />
          <SuggestedFriendsCard
            name={"Mohamed Eissa"}
            photo={
              "https://imgs.search.brave.com/VWu3w2mXEXF-24jUf_MxHz9BfaB0UQWgcfzFS4inWoY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJ1cGxvYWQv/MzkwODU4MjkvZmls/ZS9vcmlnaW5hbC00/MDE1MWZhOTc5MGVm/ZTJiNWI4YWU5MzBl/YjI4NmFmOC5qcGc_/Zm9ybWF0PXdlYnAm/cmVzaXplPTQwMHgz/MDAmdmVydGljYWw9/Y2VudGVy"
            }
            friendsNum={12}
          />
        </div>
      </div>
    </>
  );
}
