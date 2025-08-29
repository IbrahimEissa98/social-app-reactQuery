import { useState } from "react";
import { Form, Input, Button, Select, SelectItem } from "@heroui/react";
import ToggleTheme from "../components/ToggleTheme";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/registerSchema";
import { registerApi } from "../services/registerAuth";
import { Link, useNavigate } from "react-router-dom";
import PassToggle from "../components/PassToggle";
import logo from "../assets/images/icon.svg";
import loginGirl from "../assets/images/log-in-girl.svg";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleRePass, setIsVisibleRePass] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    // mode: "onTouched",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (formData) => {
    setSuccMsg("");
    setErrMsg("");
    setIsLoading(true);
    const response = await registerApi(formData);

    if (response.message == "success") {
      setSuccMsg(response.message);
      reset();
    } else {
      setErrMsg(response.error);
    }

    setIsLoading(false);

    if (!response.error) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <>
      <div
        className={`max-w-[550px] md:max-w-[700px] m-3 w-full relative p-1.5 circle-border rounded-[38px] overflow-hidden`}
      >
        <div className="relative z-10 w-full h-fit px-4 md:px-10 py-12 backdrop-blur-3xl shadow-2xl bg-white/80 dark:bg-slate-700/80 rounded-4xl">
          <div className="mb-3">
            <div
              className={`relative w-full text-center flex justify-center items-center flex-col`}
            >
              <img
                className="absolute inset-0 object-contain w-full h-full opacity-50"
                src={loginGirl}
                alt="login-girl"
              />
              <div className="flex justify-center items-center gap-2 mb-3 relative z-10">
                <img
                  className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full border-3 border-blue-500"
                  src={logo}
                  alt="logo"
                />
                <h1 className="text-3xl md:text-5xl font-extrabold text-center bg-linear-to-r from-cyan-500 to-blue-700 bg-clip-text text-transparent">
                  <span className="">Be</span>
                  <span className="">Social</span>
                </h1>
              </div>
              <p className=" mb-3 relative z-10 text-medium md:text-xl leading-8 font-medium">
                Join our community and connect with others.
                <br />
                Your journey starts here.
              </p>
              <div className="flex justify-center items-center my-4  ">
                <div className="w-14 h-0.5 bg-slate-800 dark:bg-blue-200"></div>
                <i className="fa-solid fa-star mx-2 text-xs text-blue-500"></i>
                <div className="w-14 h-0.5 bg-slate-800 dark:bg-blue-200"></div>
              </div>
            </div>
          </div>
          <Form
            className="w-full grid md:grid-cols-2 gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative w-full col-span-2 md:col-span-1">
              <Input
                // isRequired
                classNames={{
                  inputWrapper:
                    "border-2 border-blue-500/40 hover:border-blue-500/70 group-data-[focus=true]:border-blue-500 group-data-[focus=true]:hover:border-blue-500 group-data-[focus=true]:dark:bg-gray-600 bg-gray-50 dark:bg-gray-700",
                }}
                label="Name"
                type="text"
                {...register("name")}
                isInvalid={Boolean(errors.name?.message)}
                errorMessage={errors.name?.message}
              />
            </div>
            <div className="w-full relative col-span-2 md:col-span-1">
              <Input
                // isRequired
                classNames={{
                  inputWrapper:
                    "border-2 border-blue-500/40 hover:border-blue-500/70 group-data-[focus=true]:border-blue-500 group-data-[focus=true]:hover:border-blue-500 group-data-[focus=true]:dark:bg-gray-600 bg-gray-50 dark:bg-gray-700",
                }}
                label="Email"
                type="email"
                {...register("email")}
                isInvalid={Boolean(errors.email?.message)}
                errorMessage={errors.email?.message}
              />
            </div>
            <div className="w-full relative col-span-2 md:col-span-1">
              <div className="absolute z-20 right-5 top-7 -translate-y-1/2">
                <PassToggle isVisible={isVisible} setIsVisible={setIsVisible} />
              </div>
              <Input
                // isRequired
                classNames={{
                  inputWrapper:
                    "border-2 border-blue-500/40 hover:border-blue-500/70 group-data-[focus=true]:border-blue-500 group-data-[focus=true]:hover:border-blue-500 group-data-[focus=true]:dark:bg-gray-600 bg-gray-50 dark:bg-gray-700",
                }}
                label="Password"
                type={`${!isVisible ? "password" : "text"}`}
                {...register("password")}
                isInvalid={Boolean(errors.password?.message)}
                errorMessage={errors.password?.message}
              />
            </div>
            <div className="w-full relative col-span-2 md:col-span-1">
              <div className="absolute z-20 right-5 top-7 -translate-y-1/2">
                <PassToggle
                  isVisible={isVisibleRePass}
                  setIsVisible={setIsVisibleRePass}
                />
              </div>
              <Input
                // isRequired
                classNames={{
                  inputWrapper:
                    "border-2 border-blue-500/40 hover:border-blue-500/70 group-data-[focus=true]:border-blue-500 group-data-[focus=true]:hover:border-blue-500 group-data-[focus=true]:dark:bg-gray-600 bg-gray-50 dark:bg-gray-700",
                }}
                label="Confirm Password"
                type={`${!isVisibleRePass ? "password" : "text"}`}
                {...register("rePassword", {
                  required: "Confirm Password is required",
                  minLength: {
                    value: 8,
                    message: "Confirm Password must be at least 8 characters",
                  },
                })}
                isInvalid={Boolean(errors.rePassword?.message)}
                errorMessage={errors.rePassword?.message}
              />
            </div>
            <div className="w-full relative col-span-2 md:col-span-1">
              <Input
                // isRequired
                classNames={{
                  inputWrapper:
                    "border-2 border-blue-500/40 hover:border-blue-500/70 group-data-[focus=true]:border-blue-500 group-data-[focus=true]:hover:border-blue-500 group-data-[focus=true]:dark:bg-gray-600 bg-gray-50 dark:bg-gray-700",
                }}
                label="Date Of Birth"
                type="date"
                {...register("dateOfBirth", {
                  required: "Date Of Birth is required",
                })}
                isInvalid={Boolean(errors.dateOfBirth?.message)}
                errorMessage={errors.dateOfBirth?.message}
              />
            </div>
            <div className="w-full relative col-span-2 md:col-span-1">
              <Select
                // isRequired
                classNames={{
                  trigger:
                    "border-2 border-blue-500/40 hover:border-blue-500/70 group-data-[focus=true]:border-blue-500 group-data-[focus=true]:hover:border-blue-500 group-data-[focus=true]:dark:bg-gray-600 bg-gray-50 dark:bg-gray-700",
                }}
                // classNames={{
                //   trigger:
                //     "border-2 border-blue-500/40 hover:border-blue-500/70 group-data-[focus=true]:border-blue-500",
                // }}
                label="Gender"
                {...register("gender", {
                  required: "Gender is required",
                })}
                isInvalid={Boolean(errors.gender?.message)}
                errorMessage={errors.gender?.message}
              >
                <SelectItem key={"male"}>Male</SelectItem>
                <SelectItem key={"female"}>Female</SelectItem>
              </Select>
            </div>
            <div className="w-full col-span-2">
              <Button
                type="submit"
                variant="solid"
                color="primary"
                className="mx-auto w-full text-medium hover:text-xl transition-all duration-300 text-white font-bold tracking-wider flex justify-center items-center"
                isLoading={isLoading}
              >
                Register
              </Button>
              {errMsg && (
                <p className="text-center text-sm bg-red-400 text-red-800 rounded-2xl w-fit mx-auto px-4 py-1 mt-2 first-letter:capitalize">
                  {errMsg}
                </p>
              )}
              {succMsg && (
                <p className="text-center text-sm bg-green-400 text-green-800 rounded-2xl w-fit mx-auto px-4 py-1 mt-2 first-letter:capitalize">
                  {succMsg}
                </p>
              )}
              <Link
                className="text-blue-500 ms-auto block w-fit capitalize italic font-semibold mt-4"
                to={"/login"}
              >
                already have account?
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
