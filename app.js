const selectElement = document.querySelector('.form-select')
const btnCalculateElement = document.querySelector('#btn-calculate')
const inputPriceElement = document.querySelector('#input-price')
const inputDiscountElement = document.querySelector('#input-discount')

const sumAfterElement = document.querySelector('#sum-after')
const sumBeforeElement = document.querySelector('#sum-before')
const saveElement = document.querySelector('#save')
const percentDiscountElement = document.querySelector('#percent-discount')
const resultContainer = document.querySelector('.result-container')
const error = document.querySelector('.error')

const init = () => {
    btnCalculateElement.disabled = true
    inputPriceElement.disabled = true
    inputDiscountElement.disabled = true

    attachListeners()
}

const attachListeners = () => {
    selectElement.addEventListener('change', handleDiscountTypeChange)
    btnCalculateElement.addEventListener('click', handleCalculateClick)
    inputPriceElement.addEventListener('keyup', handleFormValueChange)
    inputDiscountElement.addEventListener('keyup', handleFormValueChange)
}

const handleDiscountTypeChange = (e) => {
    clearForm()
    chooseDiscountType(e)
}

const chooseDiscountType = (e) => {
    const discountType = e.target.value

    inputPriceElement.disabled = false

    if (discountType === 'Price discount' || discountType === 'Percentage discount') {
        inputDiscountElement.value = ""
        inputDiscountElement.disabled = false
    } else {
        inputDiscountElement.value = discountType.replace('%', '')
        inputDiscountElement.disabled = true
    }
}

const handleFormValueChange = () => {
    btnCalculateElement.disabled = inputPriceElement.value.length === 0 || inputDiscountElement.value.length === 0
}

const clearForm = () => {
    inputPriceElement.value = ""
    inputDiscountElement.value = ""
    resultContainer.style.visibility = "hidden"
    btnCalculateElement.disabled = true
}

const initialFormSettings = () => {
    selectElement.value = "none"
    inputPriceElement.value = ""
    inputDiscountElement.value = ""
    btnCalculateElement.disabled = true
    inputPriceElement.disabled = true
    inputDiscountElement.disabled = true
}


const handleCalculateClick = () => {
    const price = parseFloat(inputPriceElement.value)
    const discount = parseFloat(inputDiscountElement.value)
    const discountType = selectElement.value

    if (discountType === 'Price discount') {
        if (price > discount) {
            error.textContent = ''
            sumAfterElement.innerHTML = (price - discount).toFixed(2)
            saveElement.innerHTML = (price - (price - discount)).toFixed(2)
            percentDiscountElement.innerHTML = ((discount * 100) / price).toFixed(2)
        } else {
            error.textContent = 'The amount must be greater'
            return
        }
    } else {
        if (discount <= 100) {
            error.textContent = ''
            sumAfterElement.innerHTML = (price * (1 - (discount / 100))).toFixed(2)
            saveElement.innerHTML = (price - (price * (1 - (discount / 100)))).toFixed(2)
            percentDiscountElement.innerHTML = discount.toFixed(2)
        } else {
            error.textContent = 'It cannot be more than 100 percent'
            return

        }
    }

    sumBeforeElement.innerHTML = price.toFixed(2)
    resultContainer.style.visibility = "visible"
    setTimeout(initialFormSettings, 1500)
}





init()