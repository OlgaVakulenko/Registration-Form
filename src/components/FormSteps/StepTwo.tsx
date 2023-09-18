import { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"
import { yupResolver } from '@hookform/resolvers/yup';
import { FormDataContext } from '../../contexts/formDataContext';
import { step2Schema, Step2Data } from '../../helpers/validationSchemas';
import { Button } from '../../hocs/ButtonHOC';

interface Props {
	onSubmit: (val: Step2Data) => void;
	onBack: () => void;
}

export default function StepTwo({onSubmit, onBack}: Props) {
	const { formData } = useContext(FormDataContext);
	const { control, handleSubmit, formState: {errors} } = useForm({
		resolver: yupResolver(step2Schema), 
		defaultValues: { email: formData ? formData.email : '' }
	});
	const [ showPassword, setShowPassword] = useState(false);
	const [ showConfirmPassword, setShowConfirmPassword] = useState(false);

	const togglePasswordVisibility = () => setShowPassword(!showPassword);
	const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

	const submitHandler = (data: Step2Data) => onSubmit(data);

	return(
		<form onSubmit={handleSubmit(submitHandler)} className='form'>
			<div className='wrapper'>
				<div className="input-container">
				<label htmlFor="email" className='label'>Email</label>
				<Controller
					name="email"
					control={control}
					defaultValue=''
					render={({field}) => <input {...field} className='input' id="email" type="email" placeholder="Enter your email" />}
				/>
				<ErrorMessage
					errors={errors}
					name="email"
					render={({ message }) => <p className='error'>{message}</p>}
				/>
				</div>

				<div className="input-container">
				<label htmlFor="password" className='label'>Password</label>
				<Controller
					name='password'
					control={control}
					defaultValue=''
					render={({field}) => (
						<div className='field'>
							<input
								{...field}
								className='input'
								id='password'
								type={showPassword ? 'text' : 'password'}
								placeholder="Enter your password"
							/>
							<Button type="button" onClick={togglePasswordVisibility} label={showPassword ? 'Hide' : 'Show'} secondary/>
						</div>
					)}
				/>
				<ErrorMessage
					errors={errors}
					name="password"
					render={({ message }) => <p className='error'>{message}</p>}
				/>
				</div>

				<div className="input-container">
				<label htmlFor="confirmPassword" className='label'>Confirm Password</label>
				<Controller 
					name="confirmPassword"
					control={control}
					defaultValue=''
					render={({field}) => (
						<div className='field'>
							<input
								{...field}
								className='input'
								id="confirmPassword"
								type={showConfirmPassword ? 'text' : 'password'}
								placeholder="Confirm your password"
							/>
							<Button type="button" onClick={toggleConfirmPasswordVisibility} label={showConfirmPassword ? 'Hide' : 'Show'} secondary/>
						</div>
					)}
				/>
				<ErrorMessage
					errors={errors}
					name="confirmPassword"
					render={({ message }) => <p className='error'>{message}</p>}
				/>
				</div>
			</div>

			<div className='buttons'>
				<Button type="button" label="Back" id="prev" onClick={onBack} />
				<Button type="submit" label="Next" id="next"/>
			</div>
		</form>
	)
}