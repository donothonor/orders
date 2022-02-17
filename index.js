const itemCatalog = document.querySelector('.form-wrapper-catalog'),
      itemDiscription = document.querySelector('.form-wrapper-description'),
      itemDate = document.querySelector('.form-wrapper-date'),
      itemPhone = document.querySelector('.form-wrapper-phone'),
      addButton = document.querySelector('.add-btn'),
      table = document.querySelector('table'),
      removeBtn = document.querySelector('.remove-btn'),
      mainTable = document.querySelector('.main-table')

      

function createNewItem (catalog, discriprion, phone, deliveryDate) {

    let item =  {
        catalog:'',
        discriprion: '',
        phone: '',
        creationDate: '',
        deliveryDate: ''
    }


    let newItem = document.createElement('tr')


    newItem.classList.add('table-item')
    newItem.innerHTML = `<td>${catalog}</td>
                         <td>${discriprion}</td>
                         <td>${phone}</td>
                         <td>${new Date().toLocaleDateString()}</td>
                         <td>${deliveryDate}</td>
                        `
    if (catalog && discriprion && phone && deliveryDate) {

        table.append(newItem)

        newItem.addEventListener('click', () => {
            newItem.classList.toggle('completed')
        })

        localStorage.setItem(`item${localStorage.length}`,newItem.innerHTML)
    }
}




addButton.addEventListener('click', e => {

    createNewItem(itemCatalog.value, itemDiscription.value,itemPhone.value, itemDate.value)

    itemCatalog.value = ''
    itemDiscription.value = ''
    itemDate.value = ''
    itemPhone.value = ''
})      




document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.length) {
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {

                let newItem = document.createElement('tr')
                newItem.classList.add('table-item')
                newItem.innerHTML = localStorage[key]


                table.append(newItem)

                newItem.addEventListener('click', () => {
                    newItem.classList.toggle('completed')
                })
            }
        }
    }
})


// removeBtn.addEventListener('click', () => {
//     const tableItems = document.querySelectorAll('.table-item')
//     let filtredTable = ''
//     console.log(tableItems)
//     tableItems.forEach(item => {
//         if (!item.classList.contains('completed')) {
//             filtredTable += item.outerHTML
//         }
//     })

//     table.innerHTML = filtredTable
// })