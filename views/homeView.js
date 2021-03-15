const homeView = {
    render: () => {
        return `
            <div class="search-area">
                <h1 class="logo"><b title="Find">F</b>Article</h1>
                <div class="search">
                    <input data-language="searchPlaceHolder" tabindex="4" placeholder="Arama Yapın" type="search">
                    <button data-language="searchButton" tabindex="5" title="Arayın" aria-label="Arayın"><span
                            class="material-icons">search</span></button>
                </div>
            </div>
        `
    }
}

export default homeView