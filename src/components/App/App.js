import {useState, useEffect} from "react";
import ItemsList from "../ItemsList/ItemsList";
import Alert from "../Alert/Alert";
import './App.css';

function App() {
	const [newItem, setNewItem] = useState("");;
	const [items, setItems] = useState([]);
	const [editing, setEditing] = useState(false);
	const [alert, setAlert] = useState({show: false, type: "", message: ""});

	
	useEffect(() => {
		async function checkLocal(){
			if (localStorage.items){
			const data = await JSON.parse(localStorage.getItem("items"));	
				setItems(data)
	    	 }
		}
		checkLocal();
	}, []);
	
	
	useEffect(() => {
		if (items.length > 0){
			localStorage.setItem("items",JSON.stringify(items));
		}
	}, [items]);
	
	
	useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [alert])
	
	const submit = (e) => {
		e.preventDefault();		
		if (!newItem){return setAlert({show: true, type: "danger", message:"Note can't be empty.."})}
		
		let selected = false;
		
		items.forEach(item => {
			if (item.checked) {
				selected = true;
			}
		})
		
		if (selected){
			setItems(items.map(item => {
				if (item.checked){
					return {...item, note: newItem, checked: false}
				} else {
					return item;
				}
			}))
			setAlert({show: true, type: "success", message:"Item has been updated.."});
		} else {
			const randId = Math.random() * 1000;
		    setItems([...items, {note: newItem, id: randId, checked: false}]);
			setAlert({show: true, type: "success", message:"Item Added to the list.."});	
		}
		setEditing(false);
		setNewItem("");
	}
	
	
	const selectItem = (id) => {
		setItems(items.map(item => {
			if (item.id === id) {
				item.checked ? setEditing(false): setEditing(true);
				return {...item, checked: !item.checked};
			} else {
				return {...item, checked: false};
			}
		}))
	}
	
	const removeItem = (id) => {
		setItems(items.filter(item => item.id !== id));
		setAlert({show: true, message: "Item has been removed..", type: "danger"});
	}
	
  return (
    <section className="section-center">  
		  {alert.show && <Alert {...alert}/>}
		  <form 
			  className="grocery-form" 
			  onSubmit={submit}>
			  <h3>Grocery Bud</h3>
			<div className="form-control">  
				 <input 
					 className="grocery"
					 type="text" 
					 placeholder="eg eggs"
					 value={newItem} onChange={(e) => {setNewItem(e.target.value)}} />
				  <button 
					  type="submit"
					  className="submit-btn"
					  >{ (editing && items.length) ? "Edit" : "Submit"}</button>
				</div>
		  </form>   
		  
         {items.length > 0 ? <ItemsList className="grocery-list" items={items} selectItem={selectItem} removeItem={removeItem}/>: "No Notes yet.."}
		  
		 {items.length > 0 && <h4 className="clear-btn" onClick={() =>{ setItems([]); localStorage.removeItem("items");}}>Clear All Items..</h4>}
    </section>
  );
	
}

export default App;
