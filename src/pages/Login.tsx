import LoginForm from "../components/LoginForm";
import CompanyLogo from "../components/UI/CompanyLogo";
import CustomHeader from "../components/UI/CustomHeader";
import style from "./Login.module.css";

const Login = () => {
  return (
    <main className={style.main}>
      <section className={style.container}>
        <div className={style.companyLocoContainer}>
          <CompanyLogo testId={"company-logo"} />
        </div>
        <CustomHeader />
        <LoginForm />
        <p>
          ¿Ya tienes cuenta?
          <a style={{ fontWeight: "bold" }} href='/'>
            inicia sesión
          </a>
        </p>
      </section>
    </main>
  );
};

export default Login;
