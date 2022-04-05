

const itemCatalog = document.querySelector('.form-wrapper-catalog'),
      itemDiscription = document.querySelector('.form-wrapper-description'),
      itemDate = document.querySelector('.form-wrapper-date'),
      itemPhone = document.querySelector('.form-wrapper-phone'),
      addButton = document.querySelector('.add-btn'),
      table = document.querySelector('table'),
      removeBtn = document.querySelector('.remove-btn')


let itemMap = {}

function createNewItem (catalog, discription, phone, creationDate, deliveryDate, isFetched) {
    
    if (catalog && discription && phone && deliveryDate) {

        let newItem = document.createElement('tr')

        newItem.classList.add('table-item')
        newItem.innerHTML = `<td>${catalog}</td>
                            <td>${discription}</td>
                            <td>${phone}</td>
                            <td>${creationDate ? creationDate : new Date().toLocaleDateString()}</td>
                            <td>${deliveryDate}</td>
                            `

        table.append(newItem)

        newItem.addEventListener('click', () => {
            newItem.classList.toggle('completed')
        })

        if (!isFetched) {

            const item = {
                catalog: catalog,
                discription: discription,
                phone: phone,
                creationDate: new Date().toLocaleDateString(),
                deliveryDate: deliveryDate
            }
    
            itemMap[`item${uniqid('', true)}`] = item
    
            sendJSON(itemMap)
        }
    }
}




addButton.addEventListener('click', e => {

    createNewItem(itemCatalog.value, itemDiscription.value, itemPhone.value, '', itemDate.value, false)

    itemCatalog.value = ''
    itemDiscription.value = ''
    itemDate.value = ''
    itemPhone.value = ''
})      




document.addEventListener('DOMContentLoaded', () => {
    fetch("https://api.jsonbin.io/v3/b/621dd351a703bb67491f066f/versions/count")
        .then(response => response.json())
        .then(data => {
            fetch(`https://api.jsonbin.io/v3/b/621dd351a703bb67491f066f/${data.metaData.versionCount ? data.metaData.versionCount : '' }`)
                .then(res => res.json())
                .then(items => {
                    itemMap = items.record

                    for(let key in itemMap) {
                        const item = itemMap[key]

                        createNewItem(item.catalog, item.discription, item.phone, item.creationDate, item.deliveryDate, true)
                    }

                    Array.from(table.children)
                        .filter((item, index) => index !== 0)
                        .forEach(item => {
                            
                            const deliveryDate = item.children[4]
                            

                            if (deliveryDate.innerHTML === new Date().toLocaleDateString()) {
                                item.classList.add('blue')
                            }
                        })
                })
        })
})


removeBtn.addEventListener('click', () => {
    const tableItems = document.querySelectorAll('.table-item')
  
    tableItems.forEach(item => {
        if (item.classList.contains('completed')) {
            item.remove()

            for (let key in itemMap) {
                if (item.firstElementChild.innerText === itemMap[key].catalog) {
                     delete itemMap[key]
                 }
            }
        }
    });

    sendJSON(itemMap)
})

function uniqid(prefix = "", random = false) {
    const sec = Date.now() * 1000 + Math.random() * 1000;
    const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
    return `${prefix}${id}${
      random ? `.${Math.trunc(Math.random() * 100000000)}` : ""
    }`;
  }

  function sendJSON (items) {
    fetch('https://api.jsonbin.io/v3/b/621dd351a703bb67491f066f', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(items)
                })
  }

