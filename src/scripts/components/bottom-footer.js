class BottomFooter extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <footer>
                <div class="footer-main">
                    <div class"row">
                        <div class="col s12 center">
                            © 2022 <a href="#">MTA Movies</a> by Muhammad Theda Amanda. All Rights Reserved
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('bottom-footer', BottomFooter);
