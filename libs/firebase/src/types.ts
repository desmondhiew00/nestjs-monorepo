// export const Topic = {
//   CUSTOMER: process.env.NODE_ENV === 'production' ? 'CUSTOMER' : `CUSTOMER_${_.upperCase(process.env.NODE_ENV)}`,
//   STAFF: process.env.NODE_ENV === 'production' ? 'STAFF' : `STAFF_${_.upperCase(process.env.NODE_ENV)}`,
//   RIDER: process.env.NODE_ENV === 'production' ? 'RIDER' : `RIDER_${_.upperCase(process.env.NODE_ENV)}`
// };
export const Topic = {
  CUSTOMER: process.env.NODE_ENV === 'production' ? 'CUSTOMER' : `CUSTOMER_TEST`,
  STAFF: process.env.NODE_ENV === 'production' ? 'STAFF' : `STAFF_TEST`,
  RIDER: process.env.NODE_ENV === 'production' ? 'RIDER' : `RIDER_TEST`
};
