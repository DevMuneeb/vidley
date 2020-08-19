import React from "react";
 import propTypes from "prop-types";
function Paginaton(props){
    const {itemCount,pagesize,currentPage,onPageChange}=props;
    const pagesCount=Math.ceil(itemCount/pagesize);
    const pages=[];
    if(pagesCount===1){
        return null;
    }
    else{
        for(let i=1;i<=pagesCount;i++){
            pages.push(i);
        }
    }


    return(
        <React.Fragment>
           <nav>
            <ul className="pagination">
            {pages.map((page)=>{

                return(
                    <li key={page} className={page===currentPage?"page-item active":"page-item"}>
                    <a   className="page-link"
                    onClick={()=>onPageChange(page)}>{page}</a>
                    </li>
                );
            })}

            </ul>
            </nav>
        </React.Fragment>
    );
}

Paginaton.propTypes={
    itemCount:propTypes.number.isRequired,
    pagesize:propTypes.number.isRequired,
    currentPage:propTypes.number.isRequired,
    onPageChange:propTypes.func.isRequired
}
export default Paginaton;