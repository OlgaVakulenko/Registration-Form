import { createContext } from 'react';
import { FormData } from '../components/RegistrationForm';

export type FormDataContext = {
	formData: Partial<FormData> | null
};

export const FormDataContext = createContext({} as FormDataContext);