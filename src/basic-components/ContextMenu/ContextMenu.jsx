
import MenuItem from "./MenuItem"
import './ContextMenu.css'

export const contextMenuActions = {
    NEW: 'new', EDIT: 'edit'
}

const ContextMenu = ({ menu, top, left }) => {
    return <>
        <div className="menu" style={{ top: top, left: left }}>
            {
                menu.map((item, index) => (
                    <MenuItem key={`item${index}`} item={item} />
                ))
            }
        </div>
    </>
}

export default ContextMenu