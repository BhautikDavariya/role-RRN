const request = require("express");
const { Login, createUser, getUsers, getByIdUsers, getByIdUsersDelete, getByIdUsersUpdate } = require("../controller/userController");
const authTokenMiddleware = require("../middlewares/authTokenMiddleware");
const uploadStorage = require("../middlewares/multerFile");
const roleMiddleware = require("../middlewares/roleMiddleware");

const routers = request.Router();


routers.post('/login', Login)
routers.post('/create-account', createUser)

routers.get('/users', authTokenMiddleware, roleMiddleware(["user", "admin"]), getUsers)
routers.get('/users/:id', authTokenMiddleware, roleMiddleware(["user", "admin"]), getByIdUsers)
routers.put('/users/:id', authTokenMiddleware, roleMiddleware(["admin"]), getByIdUsersUpdate)
routers.post('/users/add', authTokenMiddleware, roleMiddleware(["admin"]), uploadStorage.single("file"), createUser)
routers.delete('/users/:id', authTokenMiddleware, roleMiddleware(["admin"]), getByIdUsersDelete)


module.exports = routers

