export const saveToLocalStorage = (key, value) => {
    localStorage[key] = value
}

export const getFromLocalStorage = (key) => {
    return localStorage[key]
}

export const getFromLocalStorageWithJson = (key) => {

    return JSON.parse(localStorage[key])

}

export const checkUniqueLocalStorageValue = (key, objectValue, value) => {
    if (localStorage[key]) {
        const toJson = JSON.parse(localStorage[key])
        if (toJson.find(item => item[objectValue] == value)) {
            return false
        } else {
            return true
        }
    }
}

export const saveToLocalStorageWithJson = (key, value) => {
    if (localStorage[key]) {
        const toJson = JSON.parse(localStorage[key])
        toJson.push(value)
        console.log(toJson);
        localStorage[key] = JSON.stringify(toJson)
    }
}

export const setStaticTextLanguage = async () => {
    const language = getFromLocalStorage('prefferedLanguage')
    const response = await fetch(`./languages/${language}.json`)
    const data = await response.json()


    Object.keys(data).forEach(key => {
        const element = document.querySelector(`[data-language=${key}]`)
        if (element) {
            if (key != 'searchButton') {
                element.textContent = data[key]
            }
            element.setAttribute('title', data[key])
            element.setAttribute('aria-label', data[key])
            element.setAttribute('placeholder', data[key])
        }

    })
}