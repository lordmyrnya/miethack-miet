const modules = document.querySelectorAll('.module')
const switchers = document.querySelectorAll('.switcher')
const corpSelect = document.querySelector('.corp')
const floorSelect = document.querySelector('.floor')

//Загрузка корпусов
const result = await(await fetch('http://localhost:3000/api/corps')).json()
for (const item of result) {
    const option = document.createElement('option')
    option.value = item.corpId
    option.textContent = item.name
    corpSelect.append(option)
}
corpSelect.children[0].disabled = true

corpSelect.onchange = async evt => {
    while (floorSelect.children.length > 1)
        floorSelect.lastChild.remove()
    const floorsCount = await (await fetch(`http://localhost:3000/api/floors?corpId=${evt.target.value}`)).json()
    for (let i = 1; i <= floorsCount['MAX(floor)']; i++) {
        const floor = document.createElement('option')
        floor.value = i
        floor.textContent = `Этаж ${i}`
        floorSelect.append(floor)
    }
}

switchers.forEach(switcher => {
    switcher.onclick = async () => {
        modules.forEach(module => module.classList.toggle('hidden'))
        await sleep(300)
    }
})





const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}