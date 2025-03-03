import "./style.css";

const form = document.getElementsByName("form")[0] as HTMLFormElement;

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const emailInput = form["email"] as HTMLInputElement;
    const emailErrMsg = validEmail(emailInput.value);
    if (emailErrMsg) {
      alert(emailErrMsg);
    } else {
      form.submit();
    }
  });
}

function validEmail(value: string) {
  const Email_Regex =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return Email_Regex.test(value) ? "" : "请输入正确的email";
}
