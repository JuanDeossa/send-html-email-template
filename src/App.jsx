import emailjs from "@emailjs/browser";
import { createTemplate } from "../utils/createTemplate";
import "./App.css";
import { useEffect, useState } from "react";
import {
  defaultToEmail,
  publicKey,
  serviceId,
  templateId,
  defaultFromName,
  defaultToName,
} from "../env-config";

const emptyTemplate = `<div style="background: #e0e0e0;min-height: 100px"></div>`;

function App() {
  const [html, setHtml] = useState(emptyTemplate);

  const handleShowHtml = async () => {
    const template = await createTemplate({ title: "Mi Título" });
    setHtml(template);
  };

  const handleSendEmail = () => {
    const templateParams = {
      from_name: defaultFromName,
      to_name: defaultToName,
      to_email: defaultToEmail,
      message_html: html,
    };
    sendEmail(templateParams);
  };

  const sendEmail = (templateParams) => {
    emailjs.send(serviceId, templateId, templateParams, publicKey).then(
      () => {
        alert("✔️ EMAIL ENVIADO CORRECTAMENTE");
      },
      (error) => {
        alert("✖️ ERROR ENVIANDO EMAIL", error?.text || "");
      }
    );
  };

  useEffect(() => {
    handleShowHtml();
  }, []);

  return (
    <>
      <button
        disabled={html === emptyTemplate}
        onClick={() => handleSendEmail()}
      >
        send email
      </button>
      <br />
      <br />
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </>
  );
}

export default App;
