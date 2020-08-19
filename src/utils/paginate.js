
export default function Paginate(items,currentPage,moviesLength){
    let start_index=(currentPage-1)*moviesLength;
    let end_index=start_index===0?moviesLength:start_index+moviesLength;
    if (end_index > items.length) {
        end_index=items.length;
    }
    return items.slice(start_index,end_index);
}