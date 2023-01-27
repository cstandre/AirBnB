const router = require('express').Router();
const sessionRouter = require('./session');
const userRouter = require('./users');
const spotRouter = require('./spots');
const reviewRouter = require('./reviews');
const bookingRouter = require('./bookings');
const spotImagesRouter = require('./spotImages')
const reviewImagesRouter = require('./reviewImages')
const { restoreUser } = require('../../utils/auth')

router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', userRouter);
router.use('/spots', spotRouter);
router.use('/reviews', reviewRouter);
router.use('/bookings', bookingRouter);
router.use('/spot-Images', spotImagesRouter);
router.use('/review-Images', reviewImagesRouter);

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body })
});


            // TESTING AUTH MIDDLEWARES //
// const { setTokenCookie } = require('../../utils/auth');
// router.get('/set-token-cookie', async(_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'CaitlynStAndre'
//         }
//     });
//     console.log(user)
//     setTokenCookie(res, user);
//     return res.json({ user });
// });

// router.get('/restore-user',(req, res) => {
//       return res.json(req.user);
//     }
//   );


module.exports = router;
