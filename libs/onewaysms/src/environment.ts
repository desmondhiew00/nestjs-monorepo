import Joi from 'joi';

const schema = {
  ONEWAYSMS_USERNAME: Joi.string().required(),
  ONEWAYSMS_PASSWORD: Joi.string().required()
};

export const OneWaySmsConfig = () => ({
  username: process.env.ONEWAYSMS_USERNAME,
  password: process.env.ONEWAYSMS_PASSWORD
});

export default schema;
