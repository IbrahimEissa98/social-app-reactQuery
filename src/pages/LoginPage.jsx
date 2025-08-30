import { useContext, useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../services/loginAuth";
import { loginSchema } from "../schemas/loginSchema";
import PassToggle from "../components/PassToggle";
import { isLoginContext } from "../contexts/IsLoginContext";
import logo from "../assets/images/icon.svg";
import loginGirl from "../assets/images/log-in-girl.svg";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { setIsLogin } = useContext(isLoginContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData) => {
    setErrMsg("");
    setIsLoading(true);
    const response = await loginApi(formData);
    console.log(response);

    if (response.message == "success") {
      reset();
      localStorage.setItem("token", response.token);
      setIsLogin(true);
    } else {
      setErrMsg(response.error);
    }

    setIsLoading(false);

    if (!response.error) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col md:flex-row gap-6 max-w-5xl w-full py-5 md:py-0 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className={`relative w-full md:w-1/2 text-center md:text-start md:min-h-96 flex justify-center flex-col`}
        >
          <img
            className="absolute inset-0 object-contain w-full h-full opacity-50"
            src={loginGirl}
            alt="login-girl"
          />
          <div className="flex justify-center items-center gap-2 mb-6 relative z-10 md:place-self-start">
            <img
              className="w-[60px] h-[60px] rounded-full border-3 border-blue-500"
              src={logo}
              alt="logo"
            />
            <h1 className="text-5xl font-extrabold text-center bg-linear-to-r from-cyan-500 to-blue-700 bg-clip-text text-transparent">
              <span className="">Be</span>
              <span className="">Social</span>
            </h1>
          </div>
          <p className=" mb-4 relative z-10 text-xl md:text-3xl md:leading-11 font-medium">
            Connect with friends and the world around you in a warm, vibrant
            community.
          </p>
        </div>

        {/* Form Container */}
        <div className="w-full md:w-1/2 relative p-1.5 h-fit circle-border  rounded-[38px] overflow-hidden">
          <div className="relative z-10 w-full h-fit px-4 md:px-10 py-12 backdrop-blur-3xl shadow-2xl bg-white/80 dark:bg-slate-700/80 rounded-4xl">
            <div className="mb-7">
              <h2 className="text-center font-bold text-4xl text-shadow-lg text-shadow-sky-300">
                Welcome Back
              </h2>
              <div className="flex justify-center items-center my-4  ">
                <div className="w-14 h-0.5 bg-slate-800 dark:bg-blue-200"></div>
                <i className="fa-solid fa-star mx-2 text-xs text-blue-500"></i>
                <div className="w-14 h-0.5 bg-slate-800 dark:bg-blue-200"></div>
              </div>
            </div>
            <Form
              className="w-full flex flex-col gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full relative">
                <Input
                  // isRequired
                  classNames={{
                    inputWrapper:
                      "border-2 border-blue-500/40 hover:border-blue-500/70 group-data-[focus=true]:border-blue-500 group-data-[focus=true]:hover:border-blue-500 group-data-[focus=true]:dark:bg-gray-600 bg-gray-50 dark:bg-gray-700",
                  }}
                  label="Email"
                  type="email"
                  // variant="faded"
                  {...register("email")}
                  isInvalid={Boolean(errors.email?.message)}
                  errorMessage={errors.email?.message}
                />
              </div>
              <div className="w-full relative">
                <div className="absolute z-20 right-5 top-7 -translate-y-1/2">
                  <PassToggle
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                  />
                </div>
                <Input
                  // isRequired
                  classNames={{
                    inputWrapper:
                      "border-2 border-blue-500/40 hover:border-blue-500/70 group-data-[focus=true]:border-blue-500 group-data-[focus=true]:hover:border-blue-500 group-data-[focus=true]:dark:bg-gray-600 bg-gray-50 dark:bg-gray-700",
                  }}
                  className=""
                  label="Password"
                  type={`${!isVisible ? "password" : "text"}`}
                  {...register("password")}
                  isInvalid={Boolean(errors.password?.message)}
                  errorMessage={errors.password?.message}
                />
              </div>
              <div className="w-full">
                <Button
                  type="submit"
                  variant="solid"
                  color="primary"
                  className="mx-auto w-full text-medium hover:text-xl transition-all duration-300 text-white font-bold tracking-wider flex justify-center items-center"
                  isLoading={isLoading}
                >
                  Login
                </Button>
                {errMsg && (
                  <p className="text-center text-sm bg-red-400 text-red-800 rounded-2xl w-fit mx-auto px-4 py-1 mt-2 first-letter:capitalize">
                    incorrect email or password
                  </p>
                )}
                <div className="flex justify-between items-center mt-4 font-semibold">
                  <Link
                    className="text-blue-500 capitalize italic"
                    to={"/register"}
                  >
                    don't have account?
                  </Link>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
