/**
 * Created by suparngupta on 1/11/14.
 */

function Session(data) {
    for (var x in data) {

        if (data.hasOwnProperty(x)) {

            this[x] = data[x];
        }
    }
}

Session.prototype.__defineGetter__('id', function () {
    return this._id;
});

module.exports = Session;
