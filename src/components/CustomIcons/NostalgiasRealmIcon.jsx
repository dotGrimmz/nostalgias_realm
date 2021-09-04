import React from 'react'
import nsrealm from '../../images/nosrealmlogo.jpg'
const NostalgiasRealmIcon =()=> {
    const styles ={ 
        icon : {
            backgroundImage:  `url(${nsrealm})`,
            width: '35px',
            height: '35px',
            color: 'red',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
             backgroundPosition: "center",
             borderRadius: '360px'

        }
    }
    return (

<div style={styles.icon}> </div>       
    )
}

export default NostalgiasRealmIcon
