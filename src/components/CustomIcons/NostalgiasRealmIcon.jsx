import React, {useEffect, useState} from 'react'
import nsrealm from '../../images/nostrealmlogo.png';
import Zoom from '@material-ui/core/Zoom';


const NostalgiasRealmIcon =(props)=> {
    const { iconHeight, iconWidth, zoomIn} = props;
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        let mounted = true
        const loadLogo = () => [
            setLoaded(true)
        ]
        console.log(mounted, 'icon is mounted now')
        loadLogo()
    },[])
    const styles ={ 
        icon : {
            backgroundImage:  `url(${nsrealm})`,
            width: iconWidth ? iconWidth : '28px',
            height: iconHeight ? iconHeight : '28px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
             backgroundPosition: "center",
             borderRadius: '360px',
             backgroundColor: 'grey'
        }
    }
    return (
<>
        { !zoomIn && <div style={styles.icon}> </div> }

        {zoomIn && <Zoom in={loaded} style={{ transitionDelay: loaded ? '800ms' : '100ms' }} >
            <div style={styles.icon}> </div>   
        </Zoom>}
    </>
    )
}

export default NostalgiasRealmIcon
