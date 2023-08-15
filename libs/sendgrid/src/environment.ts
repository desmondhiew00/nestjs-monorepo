import Joi from 'joi';

const schema = {
  SENDGRID_API_KEY: Joi.string().required(),
  SENDGRID_SENDER_EMAIL: Joi.string().required(),
  SENDGRID_SENDER_NAME: Joi.string().required()
};

export const SendGridEnv = () => ({
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_SENDER_EMAIL: process.env.SENDGRID_SENDER_EMAIL,
  SENDGRID_SENDER_NAME: process.env.SENDGRID_SENDER_NAME
});

export const SendGirdConfig = () => {
  const env = SendGridEnv();
  return {
    apiKey: env.SENDGRID_API_KEY,
    from: env.SENDGRID_SENDER_EMAIL,
    senderName: env.SENDGRID_SENDER_NAME
  };
};

export default schema;
