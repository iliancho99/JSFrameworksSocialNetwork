socialNetwork.factory('notifyService',
    function () {
        return {
            showInfo: function(msg) {
                noty({
                    text: msg,
                    type: 'success',
                    layout: 'topCenter',
                    timeout: 1000}
                );
            },
            showError: function(msg, serverError) {
                noty({
                    text: msg,
                    type: 'error',
                    layout: 'topCenter',
                    timeout: 5000}
                );
            }
        }
    }
);
