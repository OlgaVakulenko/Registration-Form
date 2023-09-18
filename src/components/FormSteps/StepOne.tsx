import { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from "@hookform/error-message"
import { FormDataContext } from '../../contexts/formDataContext';
import { step1Schema, Step1Data } from '../../helpers/validationSchemas';
import { FormData } from '../RegistrationForm';
import { Button } from '../../hocs/ButtonHOC';

interface Props {
	onSubmit: (val: Partial<FormData>) => void;
}

export default function StepOne({onSubmit}: Props) {
	const { formData } = useContext(FormDataContext);
	const { control, handleSubmit, formState: {errors} } = useForm({
		defaultValues: { fullName: formData ? `${formData.firstName} ${formData.lastName}` : '' }, 
		resolver: yupResolver(step1Schema)
	})

	const submitHandler = (data: Step1Data) => {
    const [firstName, lastName] = data.fullName.split(" ");
    onSubmit({ firstName, lastName });
  };

	return(
		<form onSubmit={handleSubmit(submitHandler)} className='form'>
			<div className='wrapper'>
				<div className="input-container">
					<label htmlFor="fullName" className='label'>Full Name</label>
					<Controller 
						name="fullName"
						control={control}
						defaultValue=""
						render={({field}) => <input id="fullName" className='input' {...field} placeholder="Enter your full name" />}
					/>
					<ErrorMessage
						errors={errors}
						name="fullName"
						render={({ message }) => <p className='error'>{message}</p>}
					/>
				</div>
			</div>
			<div className='buttons'>
				<Button type="submit" label="Next" id="next"/>
			</div>
		</form>
	)
}