import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Title from "../Title";

// most of this code is taken directly from the emailjs website, added styling, and a success and error message
// sends an email to contact@meadtools.com
const ContactUs = () => {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [messageColor, setMessageColor] = useState("green");

  const sendEmail = (e) => {
    e.preventDefault();
    setDisabled(true);

    emailjs
      .sendForm(
        "service_3kmg80f",
        "template_5pwnpf5",
        form.current,
        "2G-OLW9VI5seyvCUK"
      )
      .then(
        (result) => {
          console.log(result.text);
          e.target.reset();
          setMessageColor("green");
          setStatus("Your message was successfully sent!");
          setDisabled(false);
        },
        (error) => {
          console.log(error.text);
          setMessageColor("red");
          setStatus(`Something went wrong`);
          setDisabled(false);
        }
      );
  };

  return (
    <div className="main-div-style">
      <div className="component-div">
        <Title header="Contact Form"></Title>
        <form
          className="grid place-items-center"
          ref={form}
          onSubmit={sendEmail}
        >
          <div>
            <label className="p-6">Name</label>
            <input
              className="form-input"
              type="text"
              name="user_name"
              required
            />
            <label className="p-6">Email</label>
            <input
              className="form-input"
              type="email"
              name="user_email"
              required
            />
          </div>
          <label className="py-6">Message</label>
          <textarea className="form-input w-full" name="message" required />
          <input
            className="my-6 btn"
            type="submit"
            value="Send"
            disabled={disabled}
          />
        </form>
        <h1 className={`text-${messageColor}-500`}>{status}</h1>
      </div>
    </div>
  );
};

export default ContactUs;
