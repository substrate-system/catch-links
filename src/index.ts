/**
 * Callback on any link click that is local to the server.
 *
 * @param {HTMLElement} root The root element to listen on.
 * @param {(href:string)=>void} cb The function to call on link click.
 */
export function CatchLinks (
    root:HTMLElement,
    cb:(href:string) => void,
    opts:{
        handleAnchor?:boolean|((href:string)=>boolean),
        handleLink?:(href:string)=>boolean
    } = { handleAnchor: true },
):()=>void {
    root.addEventListener('click', clicker)

    function clicker (ev:MouseEvent) {
        // if command click, do nothing
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

        // if not anchor, do nothing
        if (!anchor) return true

        const url = new URL(anchor.getAttribute('href')!, location.origin)
        const urlPath = url.pathname + url.search

        // if not local, do nothing
        if (url.host !== location.host) return true

        // if we were given a function to check, call it
        if (opts.handleLink) {
            if (!opts.handleLink(urlPath)) return
        }

        // else, handle the click
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
    }

    return function unlisten () {
        root.removeEventListener('click', clicker)
    }
}

CatchLinks.resolve = resolve

export default CatchLinks

/**
 * @param {string} from
 * @param {string} to
 */
export function resolve (from:string, to:string):string {
    const fromArr = from.split('/')
        .map(path => path.replaceAll('/', ''))
        .filter(Boolean)
    const toArr = to.split('/').map(path => path.replaceAll('/', ''))

    const isRelative = (to.charAt(0) !== '/')
    if (!isRelative) return to

    const str = fromArr.concat(toArr).join('/')
    return str.charAt(0) === '/' ? str : '/' + str
}
