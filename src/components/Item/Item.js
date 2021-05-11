import {FaEdit, FaTrash} from "react-icons/fa";



const Item = ({note, id, checked,selectItem, removeItem}) => {
	
	
	return (
	<div className="grocery-item">
		<p className="title ">{note}</p>
			<div className="btn-container">
			<label htmlFor={id}> <FaEdit className={checked && "selectedItem"}/> </label>
		<input className="checkbox" id={id} type="checkbox" checked={checked} onChange={(e) => selectItem(id, e.target.checked)} />
			<span onClick={() => removeItem(id)}><FaTrash/> </span>
			</div>
		</div>
		
	)
}


export default Item;