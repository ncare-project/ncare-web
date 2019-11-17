export default {
    authCard: {
        position: 'relative',
        top: '50%',
        width: '750px',
        margin: '0 auto',
        transform: 'translateY(-50%)',
        height: '380px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 10px 25px 0 #CCC',
        '& h2': {
            textAlign: 'center'
        }
    },
    formBtn: {
        width: '280px',
        height: '40px',
        backgroundColor: '#7ab439',
        color: '#fff',
        borderRadius: '2px',
        textAlign: 'center',
        lineHeight: '40px',
        transition: '0.2s all',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#6aa429'
        }
    },
    inputBox: {
        width: '280px',
        border: '1px solid #E0E0E0',
        marginBottom: '16px',
        padding: '0 32px',
        borderRadius: '4px',
        '& > input': {
            fontSize: '12px',
            border: 'none',
            padding: '4px',
            marginBottom: '8px',
            outline: 'none'
        }
    },
    inputLabel: {
        margin: '4px 0'
    },
    rightCard: {
        position: 'absolute',
        right: 0,
        width: '450px',
        '& > *': {
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    leftCard: {
        bottom: '50px',
        left: '-60px',
        position: 'absolute',
        width: '350px',
        height: '350px',
        backgroundColor: '#5cbe2a',
        borderRadius: '12px',
        color: '#fff',
        '& > h2': {
            paddingTop: '100px'
        },
        '& > a': {
            display: 'block',
            width: '240px',
            lineHeight: '40px',
            textAlign: 'center',
            border: '2px solid #fff',
            borderRadius: '2px',
            margin: 'auto',
            transition: 'all 0.2s',
            '&:hover': {
                color: '#444',
                backgroundColor: '#fff'
            }
        }
    }
}