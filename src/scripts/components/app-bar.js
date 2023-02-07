import logo from '../../images/logo.png';

class AppBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <header>
            <div class="navbar-fixed">
                <nav class="nav-extended">
                    <div class="nav-wrapper">
                        <a href="#" class="brand-logo center">
                            <img class="vid-logo" src="${logo}" alt="Logo"/>
                        </a>
                    </div>
                    <div class="nav-content">
                        <div class="searchs searchs-transparent">
                            <div class="search">
                                <div class="sub-search">
                                    <form id="search_form">
                                        <label>
                                            <span class="input-span">
                                                <i class="material-icons">search</i>
                                                <input id="keywordSearch" name="query" type="text" tabindex="1" autocorrect="off" autofill="off" autocomplete="off" spellcheck="false" placeholder="Search by movie name..." class="input-search">
                                            </span>
                                        </label>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
      `;
    }
}

customElements.define('app-bar', AppBar);
