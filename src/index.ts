/**
 * Callback on any link click that is local to the server.
 *
 * @param {HTMLElement} root The root element to listen on.
 * @param {(href:string)=>void} cb The function to call on link click.
 */
export function CatchLinks (root:HTMLElement, cb:(href:string) => void, opts:{
    handleAnchor?:boolean|((href:string)=>boolean)
} = { handleAnchor: true }) {
    root.addEventListener('click', function (ev:MouseEvent) {
        if (ev.altKey || ev.ctrlKey || ev.metaKey || ev.shiftKey ||
            ev.defaultPrevented) {
            return true
        }

        let anchor:null|HTMLElement = null
        for (
            let n = (ev.target as HTMLElement|null);
            n && n.parentNode;
            n = n.parentElement
        ) {
            if (n!.nodeName === 'A') {
                anchor = n
                break
            }
        }
        if (!anchor) return true

        const url = new URL(anchor.getAttribute('href')!, location.origin)

        if (url.host !== location.host) return true

        //
        // handle the link locally
        //
        const urlPath = url.pathname + url.search
        if (url.href.includes('#')) {
            if (typeof opts.handleAnchor === 'function') {
                // do we want to handle this?
                const handle = opts.handleAnchor(url.href)
                if (handle) {
                    ev.preventDefault()
                    cb(resolve(location.pathname, urlPath || '') +
                        (url.hash || ''))
                    return false
                }
            } else {
                if (opts.handleAnchor) {
                    ev.preventDefault()
                    cb(resolve(location.pathname, urlPath || '') +
                        (url.hash || ''))
                    return false
                }
            }
        } else {
            ev.preventDefault()
            cb(resolve(location.pathname, urlPath || '') + (url.hash || ''))
            return false
        }
    })
}

CatchLinks.resolve = resolve

export default CatchLinks

/**
 * @param {string} from
 * @param {string} to
 */
export function resolve (from, to) {
    const fromArr = from.split('/')
        .map(path => path.replaceAll('/', ''))
        .filter(Boolean)
    const toArr = to.split('/').map(path => path.replaceAll('/', ''))

    const isRelative = (to.charAt(0) !== '/')
    if (!isRelative) return to

    const str = fromArr.concat(toArr).join('/')
    return str.charAt(0) === '/' ? str : '/' + str
}
