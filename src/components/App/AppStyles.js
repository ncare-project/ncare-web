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
            backgroundColor: '#f7fff3'
        }
    }
}