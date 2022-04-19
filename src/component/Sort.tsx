import React, {FC} from 'react';
import s from '../style/sort.module.scss'
interface sortType{
    sortCity: ()=>void,
    sortCompany: ()=>void
}
const Sort:FC<sortType> = ({sortCity, sortCompany}) => {
    return (
            <div className={s.sort_block}>
                <div className={s.sort_block_item}>
                    <div className={s.sort_block_title}>Сортировка</div>
                    <button onClick={sortCity} className={s.sort_block_btn}>по городу</button>
                    <button onClick={sortCompany} className={s.sort_block_btn}>по компании</button>
                </div>
            </div>
    );
};

export default Sort;