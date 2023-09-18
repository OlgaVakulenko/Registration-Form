import { lazy, useState, useCallback } from 'react';
import { ProgressBar } from './ProgressBar';
import { Factory } from '../../hocs/FactoryHOC';
import { FormDataContext } from '../../contexts/formDataContext';
import '../../App.css';

export type FormData = {
	firstName: string,
  lastName: string,
  email: string;
  password: string;
  confirmPassword: string;
  paymentMethod: {
    type: string;
    email?: string;
    cardNumber?: string;
  };
};

const StepOne = lazy(() => import('../FormSteps/StepOne'));
const StepTwo = lazy(() => import('../FormSteps/StepTwo'));
const StepThree = lazy(() => import('../FormSteps/StepThree'));
const ConfirmationPage = lazy(() => import('../ConfirmationPage'))

export function RegistrationForm() {
	const [step, setStep] = useState(1);
	const [isFormFilled, setIsFormFilled] = useState(false);
	const [formData, setFormData] = useState<Partial<FormData> | null>(null);

	const handleBack = useCallback(() => {
		if (step > 1) setStep(step - 1);
	}, [step]);

	const handleNext = useCallback((newData: Partial<FormData>) => {
		setFormData((prevData) => ({ ...prevData, ...newData }));
		setStep(step + 1);
	}, [step]);

	const handleSubmit = useCallback((newData: Partial<FormData>) => {
		setFormData((prevData) => ({ ...prevData, ...newData}));
		setIsFormFilled(true);
		console.log('Form data submitted:', { ...formData, ...newData });
	}, [formData])
	
	return (
		<div className='container'>
			<ProgressBar step={step} />
			<FormDataContext.Provider value={{ formData }}>
				<Factory>
					{!isFormFilled && step === 1 && <StepOne onSubmit={handleNext} />}
					{!isFormFilled && step === 2 && <StepTwo onSubmit={handleNext} onBack={handleBack} />}
					{!isFormFilled && step === 3 && <StepThree onSubmit={handleSubmit} onBack={handleBack} />}
					{isFormFilled && <ConfirmationPage />} 
				</Factory>
			</FormDataContext.Provider>
		</div>
	)
}