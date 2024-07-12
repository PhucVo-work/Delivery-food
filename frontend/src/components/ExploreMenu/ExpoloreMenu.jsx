import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {

  return (
    <div className='explore-menu' id='explore-menu' >
       <h1 >Khám phá menu của chúng tôi</h1>
       <p className='explore-menu-text'>Chọn món theo sở thích của bạn với những menu đa dạng của chúng tôi. Cung cấp những món ăn thỏa mãn cơn đói và nâng tầm vị giác. Danh sách món ăn đa dạng với nhiều hương vị thỏa mãn mọi sở thích của các bạn</p>
        <div className="explore-menu-list">
            {menu_list.map((item, index) =>{
                return (
                    <div onClick={()=> setCategory( prev => prev===item.menu_name ? 'All' : item.menu_name )} key={index} className='explore-menu-item'>
                        <img className={category===item.menu_name ? "active" : ""} src={item.menu_image} alt='' />
                        <p className={category===item.menu_name? "active-p" : ""} >{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu
