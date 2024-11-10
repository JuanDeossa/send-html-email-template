export const createTemplate = async ({ title = "titulo" }) => {
  const response = await fetch("../public/template-1.html");
  const template = await response.text();
  return template.replace("{{title}}", title);
};
