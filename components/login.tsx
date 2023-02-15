import { useState, FormEvent, MouseEventHandler, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Styles from "../src/styles/Login.module.css";

const LoginForm = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [buttonStatus, setbuttonStatus] = useState<boolean>(true);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const showPassword: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setbuttonStatus(!buttonStatus);
  };

  const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);

    if (event.target.checked) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("rememberMe");
    }
  }

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    const storedRememberMe = localStorage.getItem("rememberMe");

    if (storedRememberMe && storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);
  

  return (
    
    <div className="flex h-screen">
      <div className="w-full max-w-[398px] rounded-[10px] shadow-xl p-[30px] m-auto">
          <Image
            className="m-auto mb-[10px]"
            src={"/logoPidebot.svg"}
            width={200}
            height={200}
            alt={""}
          ></Image>
        <h1 className="text-[21px]">Iniciar sesión</h1>
        <p className="text-[13px] mb-[16px]">
          Ahora solo tienes que introducir tu nombre de usuario y contraseña y a
          disfrutar de todo lo que Pidebot te ofrece.
        </p>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="text-[16px] leading-[22.4px]"
        >
          {/* User  Label*/}
          <div>
            <label className="font-semibold" htmlFor="email">
              Nombre de usuario o Email
            </label>
            <input
              className="mb-[16px] mt-[10px] text-[15px] w-full h-[55px] pl-[24px] rounded-[5px] border-[1px] border-[#BDBDBD]"
              id="email"
              type="text"
              placeholder="Nombre de usuario o Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          {/* password  Label*/}
          <div className="mb-[24px] ">
            <label className="font-semibold" htmlFor="password">
              Contraseña
            </label>
            <div className="mb-[5px] mt-[10px] flex justify-between pl-[24px] pr-[10px] text-[15px] w-full h-[55px] rounded-[5px] border-[1px] border-[#BDBDBD]">
              <input
                className="w-full "
                id="password"
                type={buttonStatus ? "password" : "text"}
                placeholder="**********"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required />
              <button onClick={showPassword}>
                <Image
                  className="stroke-[3px]"
                  src={buttonStatus ? "/hidePassword.svg" : "/viewPassword.svg"}
                  width={30}
                  height={30}
                  alt={"view password"}
                />
              </button>
            </div>
            
            <label htmlFor="recuerdame" className={Styles.label} > <input type="checkbox" id="recuerdame" className={Styles.checkbox}  checked={rememberMe} onChange={handleRememberMeChange}/> {" Recuérdame"}</label>

          </div>

          {/* Submirt btn*/}
          <div className="flex justify-center">
            <button
              className="bg-[#2B2B2B] w-full text-[#F9F9F9] rounded-[8px] py-[16px] px-[24px] hover:scale-[104%] transition duration-500 ease-in-out"
              type="submit"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        <div className="flex flex-col gap-[5px] mt-[5px]">
          <Link className="text-[#118C7E]" href={"/forgotPassword"}>¿Olvidaste tu constraseña?</Link>
          <label htmlFor="register">
            {"¿Aún no tienes una cuenta? "}
            <Link  className="text-[#118C7E]" id="register" href={"https://share.hsforms.com/1gOLON_nYSZ6zMbNxPoduog4k2r6"}>
              Registrarme
            </Link>
          </label>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
