import './ContextMenu.css'

const MenuItem = ({ item }) => {
    return <>
        <div className="menu-item" onClick={()=>item.clickEvent()}>{item.text}</div>
    </>
}

export default MenuItem