const $ = require('jquery');

const events = () => {
    $('movie-detail-modal .modal-footer .modal-close').on('click', () => {
        $('movie-detail-modal .modal-content').html('');
    });
};

export default events;
