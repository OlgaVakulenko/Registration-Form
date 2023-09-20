import { createContext } from 'react';
import { FormData } from '../components/RegistrationForm';

export type Form = {
	formData: Partial<FormData> | null
};

export const FormDataContext = createContext({} as Form);