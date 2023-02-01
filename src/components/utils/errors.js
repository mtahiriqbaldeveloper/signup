export const classErrors = ({ errors, touched }, name) => {
  return errors[name] && touched[name] ? "error" : null;
};
