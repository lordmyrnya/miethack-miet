const modules = document.querySelectorAll('.module')
const switchers = document.querySelectorAll('.switcher')
const corpSelect = document.querySelector('.corp')

//Загрузка корпусов
const result = await(await fetch('http://localhost:3000/api/corps')).json()
for (const item of result) {
    const option = document.createElement('option')
    option.value = item.corpId
    option.textContent = item.name
    corpSelect.append(option)
}
corpSelect.children[0].disabled = true

corpSelect.onchange = () => {
    console.log('object');
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