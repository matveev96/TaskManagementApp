type ButtonPropsType = {
	title: string
	onClick:()=> void
}

export const Button = ({title, onClick}: ButtonPropsType) => {
	const onClickHandler = () => {
		onClick()
	}

	return (
		<button onClick={onClickHandler}>{title}</button>
	)
}
