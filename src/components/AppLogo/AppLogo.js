import React from 'react'
import injectStyles from 'react-jss'
import styles from './AppLogoStyles'

export default injectStyles(styles)(props => (
    <h1 className={`${props.classes.AppLogo} ${props.primary ?
        props.classes.primary :
        props.classes.secondary}`
    }>
        NCare
    </h1>
))