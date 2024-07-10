import React from "react";
import { createUseStyles } from "react-jss";
import Gender from "../gender/Gender";

const useStyles = createUseStyles({
    option: {
       position:"relative",
       display: 'flex',
       flexBasis:'0',
       justifyContent:'space-between'
    },
    div: {
        // marginRight: "80px",
        marginLeft: "80px"
    },
    genders:{
        // marginRight:"0px",
        margin:"0px",
        padding:"0px",
        display: 'flex',

    }

})

const Option = ({ name, genders }) => {
    const css = useStyles()

    return <>
        <div>
            {
                <div className={css.option}>
                    <div className={css.div}> {name}</div>

                    <div className={css.genders}>  {
                        genders?
                        genders.map((item, index) =>
                            <Gender text={item} key={index}></Gender>
                        ):""}
                    </div>
                </div >

            }
        </div>

    </>
}
export default Option