const Alert = ({message, type}) => {
	return (
	<div className={`alert ${ type === "danger" ? "alert-danger": "alert-success"}`}>
		{message} 
		</div>
	)
}

export default Alert;