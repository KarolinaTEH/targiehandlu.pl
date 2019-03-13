


import { withFormik } from 'formik';
import fetch from 'isomorphic-unfetch';
import { addToken } from '../helpers';
import { validationSchema } from './validations'


export const filterFields = (fields, start) => {
  const all = Object.keys(fields);
  return start ? all.filter(f => start.indexOf(f) === -1) : all;
};


const apiUrl =
  'https://api.eventjuicer.com/v1/public/hosts/targiehandlu.pl/register';


export default withFormik({

  validationSchema: validationSchema,
  isInitialValid: false,
  validateOnBlur: true,
  validateOnChange: true,
  //RE-RENDER on wrapped component props change?
  enableReinitialize: false,
  mapPropsToValues: ({ data }) => ({
    ...data
  }),
  handleSubmit: (payload, { props, setSubmitting, setErrors, setStatus }) => {

    setSubmitting(true);

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: payload,
        tickets: { [props.ticketId]: 1 },
        template : "template" in props ? props.template : "",
        locale : "locale" in props ? props.locale : "",
        cc : "cc" in props ? props.cc : "" 
      })
    })
      .then(response => {
        if (response.status !== 200) {
        }
        return response.json();
      })
      .then(data => {

        setSubmitting(false);

        if ('data' in data && 'token' in data.data) {
          addToken(data.data.token);
          setStatus('ok');
        }

        //error?
        if ('error' in data) {
          setStatus('error');
        }
      });
  },

  displayName: 'MyForm'

});
