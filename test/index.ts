import CatchLinks from '../src/index.js'
import { test } from '@bicycle-codes/tapzero'

test('example', async t => {
    t.plan(1)

    CatchLinks(document.body, function onLinkClick (href) {
        t.equal(href, '/hello', 'should callback with the right URL')
        console.log('href', href)
    })

    document.getElementById('hello')?.click()
    document.getElementById('example')?.click()
})
