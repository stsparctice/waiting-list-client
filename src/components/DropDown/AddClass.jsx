import { createUseStyles } from "react-jss"

const AddClass = ({ name, color }) => {
    const useStyle = createUseStyles({
        color: {
            backgroundColor: color,
            textAlign: 'center',
            height: '50px',
            border: '3px solid black',
            marginTop: '2px',
            
        }
    })
    const css = useStyle()
    return <>
        <option value={name} key={name} className={css.color}>{name}</option>
    </>
}
export default AddClass