import React, { Fragment} from 'react'
import { Helmet } from 'react-helmet'
const Meta = ({title,description,keywords}) => {
    return (
        <Fragment>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords}/>
            </Helmet>
        </Fragment>
    )
}
Meta.defaultProps={
    title:'Welcome to aeroshop',
    description:'electronics, buy electronics, cheap electronics',
    keywords:'We sell the best products for cheap'
}

export default Meta
