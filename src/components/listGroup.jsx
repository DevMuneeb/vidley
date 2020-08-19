import React  from "react";

function ListGroup(props){
    const {items,textProperty,valueProperty,onItemSelect,selectedItem}=props;
    return (
        <ul className="list-group" style={{cursor:"pointer"}}>

       {items.map((item)=>{
           return (
            <li key={item[valueProperty]?item[valueProperty]:"allgenre"} onClick={()=>onItemSelect(item)} className={selectedItem===item?"list-group-item active":"list-group-item"}>
                {item[textProperty]}
                
            </li>
           );

       })}
        </ul>
    );
}
ListGroup.defaultProps={
    textProperty:"name",
    valueProperty:"_id"

}
export default ListGroup;