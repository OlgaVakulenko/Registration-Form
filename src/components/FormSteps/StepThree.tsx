import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"
import { yupResolver } from '@hookform/resolvers/yup';
import { step3Schema, Step3Data } from '../../helpers/validationSchemas';
import { Button } from '../../hocs/ButtonHOC';

interface Props {
	onSubmit: (val: Step3Data) => void;
	onBack: () => void;
}

export default function StepThree({onSubmit, onBack}: Props) {
	const { control, handleSubmit, watch, formState: {errors} } = useForm({resolver: yupResolver(step3Schema)});
	const selectedMethod = watch('paymentMethod.type');
	
	function submitHandler(data: Step3Data){
		const finalData = filterFinalData(data);
		onSubmit(finalData)
	}

	function filterFinalData(data: Step3Data) {
		if (selectedMethod === 'pp') {
			return { 
				...data, 
				paymentMethod: {
					type: data.paymentMethod.type,
					paymentEmail: data.paymentMethod.paymentEmail
				}
			}
		} else {
			return {
				...data, 
				paymentMethod: {
					type: data.paymentMethod.type,
					cardNumber: data.paymentMethod.cardNumber
				}
			}
		}
	}
	
	return(
		<form onSubmit={handleSubmit(submitHandler)} className='form'>
			<div className='wrapper'>
				<label className='label'>Choose your payment method</label>
				<div className="input-container">
					<Controller
						name="paymentMethod.type"
						defaultValue=""
						control={control}
						render={({ field }) => (
							<>
								<label className='label'>
									<input {...field} value="pp" type="radio" checked={field.value === 'pp'} />
									PayPal
								</label>
								<label className='label'>
									<input {...field} value="cc" type="radio" checked={field.value === 'cc'} />
									Credit Card
								</label>
							</>
						)}
					/>
					<ErrorMessage
						errors={errors}
						name="paymentMethod.type"
						render={({ message }) => <p className='error'>{message}</p>}
					/>
				</div>

				<div className="input-container">
				{selectedMethod === 'pp' &&
					<>
						<label htmlFor="ppEmail" className='label'>PayPal Email</label>
						<Controller
						name="paymentMethod.paymentEmail"
						control={control}
						defaultValue=""
						render={({ field }) => <input {...field} className='input' type="email" id="ppEmail" placeholder="PayPal Email" />}
						/>
						<ErrorMessage
							errors={errors}
							name="paymentMethod.paymentEmail"
							render={({ message }) => <p className='error'>{message}</p>}
						/>
					</> }
				{selectedMethod === 'cc' && 
				<>
					<label htmlFor="ccNumber" className='label'>Credit Card Number</label>
						<Controller
						name="paymentMethod.cardNumber"
						control={control}
						defaultValue=""
						render={({ field }) => <input {...field} className='input' type="text" id="ccNumber" placeholder="Enter credit card number" />}
					/>
					<ErrorMessage
						errors={errors}
						name="paymentMethod.cardNumber"
						render={({ message }) => <p className='error'>{message}</p>}
					/> 
				</> }
				</div>
			</div>

			<div className='buttons'>
				<Button type="button" label="Back" id="prev" onClick={onBack}/>
				<Button type="submit" label="Submit" id="next"/>
			</div>
		</form>
	)
}