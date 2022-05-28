const modules = document.querySelectorAll('.module')
const switchers = document.querySelectorAll('.switcher')

switchers.forEach(switcher => {
    switcher.onclick = async () => {
        modules.forEach(module => module.classList.toggle('hidden'))
        await sleep(300)
    }
})

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}