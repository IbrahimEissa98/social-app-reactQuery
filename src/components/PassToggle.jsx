import { Input } from "@heroui/react";

export default function PassToggle({ isVisible, setIsVisible }) {
  const toggle = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <Input type="checkbox" className="hidden peer" onClick={() => {}} />
      <label className="cursor-pointer" onClick={toggle}>
        <i
          className={`fa-regular ${!isVisible ? "fa-eye" : "fa-eye-slash"}`}
        ></i>
      </label>
    </>
  );
}
