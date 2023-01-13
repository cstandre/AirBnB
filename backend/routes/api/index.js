const router = require('express').Router();
const { restoreUser } = require('../../utils/auth')
const { User } = require('../../db/models');

router.use(restoreUser)

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
