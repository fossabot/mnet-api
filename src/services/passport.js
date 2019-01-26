import {Strategy, ExtractJwt} from 'passport-jwt'

import User from '../models/user'

import dbConfig from '../config/database'

export default passport => {
  let opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
  opts.secretOrKey = dbConfig.secret
  passport.use(
    new Strategy(opts, (payload, res) => {
      User.getUserById(payload.id, (err, user) => {
        if (err) {
          return res(null, false)
        }

        if (user) {
          return res(null, user)
        } else {
          return res(null, false)
        }
      })
    }),
  )
}
