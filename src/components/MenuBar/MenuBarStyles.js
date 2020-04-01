export default {
    sideMenu: {
        display: 'flex',
        flexFlow: 'column nowrap',
        position: 'sticky',
        top: '0px',
        backgroundColor: '#7ab439',
        height: '100vh',
        color: '#fff',
        '& > h1': {
            marginLeft: '12px'
        },
        '& > a': {
            padding: '8px 0 8px 24px',
            transition: '0.3s all',
            lineHeight: '46px',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#aad082'
            }
        }
    }
}