import Item from "../Item/Item";

const ItemsList = ({items, selectItem, removeItem}) => {
	
	return (
	<div>
			{items.map(item => {
				return <Item key={item.id} {...item} selectItem={selectItem} removeItem={removeItem}/>
			})}
		</div>
	)
}

export default ItemsList;