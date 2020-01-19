const LoginValid = data => {
  console.log('data', data);

  let errors = {};
  //check for consistance

  //check for empty fields

  if (data.email.length === 0) {
    errors.email = 'Email can not be empty';
  }
  if (data.password.length === 0) {
    errors.password = 'Password can not be empty';
  }

  const isEmpty = errors => {
    return Object.keys(errors).length === 0;
  };

  return {errors, isValid: isEmpty(errors)};
};
export default LoginValid;
