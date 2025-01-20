import { CatchLinks } from '../src/index.js'

// CatchLinks(document.body, href => {
//     console.log('caught this link', href)
// })

CatchLinks(document.body, href => {
    console.log('caught this link', href)
}, {
    handleAnchor: (href) => {
        console.log('handling this', href)
        return !href.includes('bbbbb')
    }
})
