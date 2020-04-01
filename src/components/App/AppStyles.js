import OpenSansRegular from '../../fonts/Open_Sans/OpenSans-Regular.ttf'
import OpenSansLight from '../../fonts/Open_Sans/OpenSans-Light.ttf'
import OpenSansBold from '../../fonts/Open_Sans/OpenSans-Bold.ttf'
import OpenSansSemiBold from '../../fonts/Open_Sans/OpenSans-SemiBold.ttf'

export default {
    '@font-face': [
        {
            fontFamily: 'Open Sans',
            src: `url(${OpenSansRegular})`,
            fontWeight: 'normal'
        },
        {
            fontFamily: 'Open Sans',
            src: `url(${OpenSansLight})`,
            fontWeight: '300'
        },
        {
            fontFamily: 'Open Sans',
            src: `url(${OpenSansBold})`,
            fontWeight: '700'
        },
        {
            fontFamily: 'Open Sans',
            src: `url(${OpenSansSemiBold})`,
            fontWeight: '800'
        } 
    ],
    '@global': {
        'html': {
            fontFamily: 'Open Sans',
            backgroundColor: '#f7fff3',
        },
        'body': {
            // width: '100%',
            margin: 0
        },
        '.root': {
            width: '100vw',
            height: '100vh'
        }, 
        'a': {
            color: 'inherit',
            textDecoration: 'none'
        },
        '.two-columns': {
            display: 'flex',
            flexFlow: 'row nowrap',
            '& > :first-child': {
                minWidth: '300px'
            }
        },
        '.user-profile': {
            margin: '32px 64px',
            '& img': {
                width: '128px',
                borderRadius: '50%'
            }
        },
        '.new-zone-form': {
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'center',
            backgroundColor: '#fff',
            width: '250px',
            margin: '0 auto',
            color: '#000',
            padding: '10px',
            '& input': {
                width: '220px',
                fontSize: '12px',
                border: 'none',
                padding: '4px',
                marginBottom: '12px',
                outline: 'none'
            },
            '& div': {
                width: '220px',
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
            }
        }
    }
}