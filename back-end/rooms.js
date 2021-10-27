// this may be necessary,
// since one person cannot be in more than one room
const rooms = {}

function newRoom(id) {
    return {
        id,
        avatars: {},
        figures: [],
        updateAvatar(avatar) {
            this.avatars[avatar.id] = avatar
        },
        deleteAvatar(id) {
            if (id in this.avatars) {
                delete this.avatars[id]
            }
        },
    }
}

function getRoom(id) {
    if (!(id in rooms)) {
        rooms[id] = newRoom(id)
    }
    return rooms[id]
}

function deleteRoom(id) {
    delete rooms[id]
}

module.exports = { getRoom, deleteRoom }
