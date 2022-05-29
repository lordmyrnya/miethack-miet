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
// const newStudent = document.querySelector('.newStudent-btn')
// const adminPanelBtn = document.querySelector('.adminPanel-btn')
const backBtns = document.querySelectorAll('.back-btn')

const studentName = document.querySelector('.student h3')
const studentCardNum = document.querySelector('.cardNum')
const studentBirthDate = document.querySelector('.birthDate')
const studentOrderDorm = document.querySelector('.orderDorm')
const studentOrderEnroll = document.querySelector('.orderEnroll')
const studentEnrollDate = document.querySelector('.enrollDate')
const studentBirthPlace = document.querySelector('.birthPlace')
const studentAddress = document.querySelector('.address')

const newStudentFio = document.querySelector('.newStudent .fio')
const newStudentCorpSelect = document.querySelector('.newStudent .corp')
const newStudentFloorSelect = document.querySelector('.newStudent .floor')
const newStudentNumber = document.querySelector('.newStudent .number')
const newStudentBirthDate = document.querySelector('.newStudent .birthDate')
const newStudentOrderDorm = document.querySelector('.newStudent .orderDorm')
const newStudentOrderEnroll = document.querySelector('.newStudent .orderEnroll')
const newStudentEnrollDate = document.querySelector('.newStudent .enrollDate')
const newStudentBirthPlace = document.querySelector('.newStudent .birthPlace')
const newStudentAddress = document.querySelector('.newStudent .address')
const pushStudent = document.querySelector('.pushStudent')

corpSelect.children[0].selected = true
newStudentCorpSelect.children[0].selected = true

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

newStudentCorpSelect.onchange = async evt => {
    while (newStudentFloorSelect.children.length > 1)
        newStudentFloorSelect.lastChild.remove()

    if (!newStudentCorpSelect.value)
        return

    const floorsCount = await (await fetch(`http://localhost:3000/api/floors?corpId=${evt.target.value}`)).json()
    for (let i = 1; i <= floorsCount['MAX(floor)']; i++) {
        const floor = document.createElement('option')
        floor.value = i
        floor.textContent = `Этаж ${i}`
        newStudentFloorSelect.append(floor)
    }
}

switchers.forEach(switcher => {
    switcher.onclick = async evt => {
        evt.target.parentNode.classList.toggle('hidden')
        await sleep(300)
        if (evt.target.classList.contains('newStudent-btn'))
            document.querySelectorAll('.module')[1].classList.toggle('hidden')
        if (evt.target.classList.contains('adminPanel-btn'))
            document.querySelectorAll('.module')[2].classList.toggle('hidden')
    }
})

backBtns.forEach(btn => {
    btn.onclick = async () => {
        modules.forEach(module => module.classList.add('hidden'))
        await sleep(300)
        modules[0].classList.remove('hidden')
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

pushStudent.onclick = async () => {
    let roomId = await (await fetch(`http://localhost:3000/api/roomId?corpId=${newStudentCorpSelect.value}&floor=${newStudentFloorSelect.value}&number=${newStudentNumber.value}`)).json()
    roomId = roomId.roomId
    const data = {
        "FIO": newStudentFio.value,
        "birthDate": newStudentBirthDate.value,
        "orderDorm": newStudentOrderDorm.value,
        "orderEnroll": newStudentOrderEnroll.value,
        "enrollDate": newStudentEnrollDate.value,
        "birthPlace": newStudentBirthPlace.value,
        "address": newStudentAddress.value,
        "roomId": roomId
    }
    fetch("http://localhost:3000/api/newStudent", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    // const link = `http://localhost:3000/api/newStudent?FIO=${newStudentFio.value}&birthDate=${newStudentBirthDate.value}&orderDorm=${newStudentOrderDorm.value}&orderEnroll=${newStudentOrderEnroll.value}&enrollDate=${newStudentEnrollDate.value}&birthPlace=${newStudentBirthPlace.value}&address=${newStudentAddress.value}&roomId=${roomId}`
    // console.log(link);
    // fetch(link)
}

const addCorp = document.querySelector('.admin-panel .addCorp')
const delCorp = document.querySelector('.admin-panel .delCorp')
const addNumber = document.querySelector('.admin-panel .addNumber')
const delNumber = document.querySelector('.admin-panel .delNumber')
if (addCorp) {
    addCorp.onclick = () => {
        const data = {
            "name": document.querySelector('.admin-panel .corpName').value,
            "location": document.querySelector('.admin-panel, .corpLocation').value
        }
        fetch("http://localhost:3000/api/addCorp", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }

    delCorp.onclick = () => {
        const data = {
            "corpId": document.querySelector('.admin-panel .corp').value
        }
        fetch("http://localhost:3000/api/removeCorp", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }

    addNumber.onclick = () => {
        const data = {
            "corpId": document.querySelector('.admin-panel .corpId').value,
            "floor": document.querySelector('.admin-panel .floor').value,
            "roomNumber": document.querySelector('.admin-panel .number').value
        }
        fetch("http://localhost:3000/api/addRoom", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }

    delNumber.onclick = () => {
        const data = {
            "roomId": document.querySelector('.admin-panel .roomId').value
        }
        fetch("http://localhost:3000/api/removeRoom", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }
}
const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}