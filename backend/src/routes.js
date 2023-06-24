// Import controlers
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const checkUserFn = require('./middlewares/checkUserFn');
const checkUserFnSolution = require('./middlewares/checkUserFnSolution');
const verify = require('./middlewares/verify');


// Match URL's with controllers
exports.appRoute = router => {

    router.post('/api/user/login', authController.processLogin); //login
    router.post('/api/user/register', authController.processRegister); //register
    router.post('/api/user/process-submission', checkUserFn.getClientUserId, userController.processDesignSubmission); //submit design
    router.put('/api/user/', verify.verifyToken, verify.verifyRole, userController.processUpdateOneUser); //update user
    router.put('/api/user/design/', userController.processUpdateOneDesign); //update design
    router.post('/api/user/processInvitation/', checkUserFn.getClientUserId, userController.processSendInvitation); //invite friend

    router.get('/api/user/process-search-design/:pagenumber/:search?', checkUserFn.getClientUserId, userController.processGetSubmissionData); //search design
    router.get('/api/user/process-search-user/:pagenumber/:search?', verify.verifyToken, verify.verifyRole, checkUserFn.getClientUserId, userController.processGetUserData); //admin search user
    router.get('/api/user/process-search-user-design/:pagenumber/:search?', verify.verifyToken, verify.verifyRole, userController.processGetSubmissionsbyEmail); //admin search design
    router.get('/api/user/:recordId', verify.verifyUserToken, userController.processGetOneUserData); //profile
    router.get('/api/user/design/:fileId', userController.processGetOneDesignData); //single design
    router.get('/api/manage_user/:recordId', userController.processGetOneUserData); //admin user inforamtion
};