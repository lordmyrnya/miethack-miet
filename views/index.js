const modules = document.querySelectorAll('.module')
const switchers = document.querySelectorAll('.switcher')
const corpSelect = document.querySelector('.corp')
const floorSelect = document.querySelector('.floor')
const buttons = document.querySelectorAll('.search-btn')
const fio = document.querySelector('.fio')
const number = document.querySelector('.number')
const table = document.querySelector('.table tbody')
const studentModule = document.querySelector('.student')
const closeStudent = document.querySelector('.close-student')

const studentName = document.querySelector('.student h3')
const studentCardNum = document.querySelector('.cardNum')
const studentBirthDate = document.querySelector('.birthDate')
const studentOrderDorm = document.querySelector('.orderDorm')
const studentOrderEnroll = document.querySelector('.orderEnroll')
const studentEnrollDate = document.querySelector('.enrollDate')
const studentBirthPlace = document.querySelector('.birthPlace')
const studentAddress = document.querySelector('.address')

corpSelect.children[0].selected = true

corpSelect.onchange = async evt => {
    while (floorSelect.children.length > 1)
        floorSelect.lastChild.remove()

    if (!corpSelect.value)
        return

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

buttons.forEach(button => {
    button.onclick = loadStudents
})
floorSelect.onchange = () => {
    if (floorSelect.value)
        loadStudents()
}
fio.oninput = () => {
    if (fio.value)
        loadStudents()
}
number.oninput = () => {
    if (number.value)
        loadStudents()
}

async function loadStudents() {
    table.innerHTML = `
    <tr>
        <th>ФИО</th>
        <th>Корпус</th>
        <th>Этаж</th>
        <th>Комната</th>
    </tr>`
    let link = `http://localhost:3000/api/search?`
    if (fio.value) link += `fio=${fio.value}&`
    if (corpSelect.value) link += `corpId=${corpSelect.value}&`
    if (floorSelect.value) link += `floor=${floorSelect.value}&`
    if (number.value) link += `number=${number.value}`
    if (link[link.length - 1] === '&' || link[link.length - 1] === '?') link = link.slice(0, link.length - 1)

    const students = await (await fetch(link)).json()
    students.forEach(student => {
        const tr = document.createElement('tr')
        const tdFIO = document.createElement('td')
        const tdCorp = document.createElement('td')
        const tdFloor = document.createElement('td')
        const tdRoom = document.createElement('td')
        tdFIO.textContent = student.FIO
        tdCorp.textContent = student.name
        tdFloor.textContent = student.floor
        tdRoom.textContent = student.number
        tr.append(tdFIO, tdCorp, tdFloor, tdRoom)
        tr.setAttribute('cardnum', student.cardNum)
        table.append(tr)
    })
}

table.onclick = async evt => {
    const cardNum = evt.target.parentNode.getAttribute('cardnum')
    if (!cardNum)
        return
    const studentInfo = await (await fetch(`http://localhost:3000/api/student?cardNum=${cardNum}`)).json()
    studentName.textContent = studentInfo.FIO
    console.log(studentInfo);
    studentCardNum.textContent = studentInfo.cardNum
    studentBirthDate.textContent = studentInfo.birthDate
    studentOrderDorm.textContent = studentInfo.orderDorm
    studentOrderEnroll.textContent = studentInfo.orderEnroll
    studentEnrollDate.textContent = studentInfo.enrollDate
    studentBirthPlace.textContent = studentInfo.birthPlace
    studentAddress.textContent = studentInfo.address
    studentModule.classList.toggle('active')
}

closeStudent.onclick = () => studentModule.classList.toggle('active')

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}