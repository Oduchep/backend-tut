export const validator = ({ value, schema }) => {
  return schema.validate(value);
};
