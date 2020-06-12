const yup = require('yup');

module.exports = yup.object().shape({
  origin: yup.string().url().required(),
  port: yup.number().required().default(8180),
  username: yup.string().required(),
  password: yup.string().required()
});
