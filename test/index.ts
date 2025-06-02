import CatchLinks from '../src/index.js'
import { click } from '@substrate-system/dom'
import { test } from '@substrate-system/tapzero'

test('Catch links defaults', t => {
    t.plan(1)

    const unlisten = CatchLinks(document.body, function onLinkClick (href) {
        t.equal(href, '/hello', 'should callback with the right URL')
    })

    document.getElementById('hello')?.click()
    document.getElementById('example')?.click()

    unlisten()
})

test('handle anchor function', async t => {
    t.plan(1)

    CatchLinks(document.body, (href) => {
        t.equal(href, '/foo')
    }, {
        handleLink: (href) => {
            if (href.includes('foo')) return true
            return false
        }
    })

    click('#hello')
    click('#foo')
    click('#example')
})
