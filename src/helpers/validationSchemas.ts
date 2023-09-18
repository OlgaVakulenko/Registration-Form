import * as yup from 'yup';

export const step1Schema = yup.object().shape({
	fullName: yup.string()
		.matches(
			/^([a-zA-Z]{3,} [a-zA-Z]{3,})$/,
				'At least two words, each containing a minimum of 3 letters'
			)
		.required("Full Name is required")
})

export const step2Schema = yup.object().shape({
	email: yup.string().email("Invalid email address"),
	password: yup.string()
		.min(8, "Password most be at least 8 characters")
		.matches(/[a-z]/, "At least one lowercase char")
		.matches(/[A-Z]/, "At least one uppercase char")
		.matches(/\d/, "At least one digit")
		.required("Password is required"),
	confirmPassword: yup.string()
		.oneOf([yup.ref('password')], "Password must match")
		.required("confirm password is required")
});

export const step3Schema = yup.object().shape({
  paymentMethod: yup.object({
    type: yup.string().required("Payment method type is required"),
    paymentEmail: yup.string()
      .test('is-paypal', "Invalid PayPal email address", function(value) {
        const type = this.parent.type;
        
        if (type === 'pp') {
          return yup.string().email().isValidSync(value);
        }
        return true;
      })
      .test('paypal-required', "PayPal email is required", function(value) {
        const type = this.parent.type;
        
        if (type === 'pp') {
          return !!value;
        }
        return true;
      }),
    cardNumber: yup.string()
      .test('is-card', "Invalid Credit Card Number", function(value) {
        const type = this.parent.type;
        
        if (type === 'cc' && value) {
          return /^[0-9]{16}$/.test(value);
        }
        return true;
      })
      .test('card-required', "Credit Card Number is required", function(value) {
        const type = this.parent.type;
      
        if (type === 'cc') {
          return !!value;
        }
        return true;
      }),
  }),
});


export type Step1Data = yup.InferType<typeof step1Schema>;
export type Step2Data = yup.InferType<typeof step2Schema>;
export type Step3Data = yup.InferType<typeof step3Schema>;
