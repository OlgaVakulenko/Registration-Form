import '../../App.css';

interface Props {
	step: number;
}

export function ProgressBar({ step }: Props) {

	return(
		<div className="container">
      <div className="steps">
        <span className={`circle ${step > 0 && 'active'}`}>1</span>
				<span className={`indicator ${step > 1 && 'active'}`}></span>
        <span className={`circle ${step > 1 && 'active'}`}>2</span>
				<span className={`indicator ${step > 2 && 'active'}`}></span>
        <span className={`circle ${step > 2 && 'active'}`}>3</span>
      </div>
    </div>
	)
}