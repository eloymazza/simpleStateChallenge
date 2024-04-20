import LoginForm from "../components/LoginForm";
import CompanyLogo from "../components/UI/CompanyLogo";
import CustomHeader from "../components/CustomHeader";
import style from "./Login.module.css";
import AlreadyHasAccount from "../components/AlreadyHasAccount";

const Login = () => {
  return (
    <main className={style.main}>
      <section className={style.container}>
        <div className={style.companyLocoContainer}>
          <CompanyLogo testId={"company-logo"} />
        </div>
        <CustomHeader />
        <LoginForm />
        <AlreadyHasAccount />
      </section>
    </main>
  );
};

export default Login;
