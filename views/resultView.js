const resultView = {
    render: () => {
        return `
            <div class="search-result">
                <div class="search">
                    <input tabindex="4" placeholder="Arama Yapın" type="search">
                    <button tabindex="5" title="Arayın" aria-label="Arayın"><span
                            class="material-icons">search</span></button>
                </div>
                <div class="results">
                </div>
            </div>
        `
    }
}

export default resultView