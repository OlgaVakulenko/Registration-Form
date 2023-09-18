import '../App.css';

interface Props {
	type: "button" | "submit" | "reset";
	label: string;
	id?: string;
	secondary?: boolean;
	onClick?: () => void;
}

export function Button({ type, onClick, label, id, secondary }: Props) {
	
  return <button type={type} onClick={onClick} id={id} className={secondary ? 'secondary-button' : 'button'}>{label}</button>;
}