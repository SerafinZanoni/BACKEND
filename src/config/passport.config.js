import passport from "passport";
import local from "passport-local";
import google from "passport-google-oauth20";
import jwt from "passport-jwt";
import passportCustom from "passport-custom";
import userRepository from "../dao/mongoDB/user.repository.js";
import cartRepository from "../dao/mongoDB/cart.repository.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import  envs from "./envs.config.js"
import { cookieExtrator } from "../utils/cookieExtractor.js";
import { verifyToken } from "../utils/jw.js";


const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const CustomStrategy = passportCustom.Strategy;


export const initializePassport = () => {

    ///REGISTRANDO NUEVO USUARIO. AL REGISTRARLO SE CREA UN CART.
    // SE HASHEA EL PASSWORD. 
    //SE VALIDA QUE EL USUARIO NO EXISTA.
    passport.use(
        "register",
        new LocalStrategy({passReqToCallback: true, usernameField: "email"}, async(req, username, password, done) => {
                try {
                    const {firstName, lastName, age, role} = req.body;
                    const user = await userRepository.getByEmail(username);
                    if(user) return done(null, false, {message: "User already exist"});

                    const cart = await cartRepository.create();

                    const newUser = {
                        firstName,
                        lastName,
                        password: createHash(password),
                        email: username,
                        age,
                        role,
                        cart: cart._id
                    }
                    const userCreate  = await userRepository.create(newUser);
                    return done(null, userCreate);

                } catch (error) {
                    return done(error);
                    
                }
        })
    );

    ////estrategia de autenticacion de google
    passport.use(
        "google",
        new GoogleStrategy(
            {
            clientID: envs.GOOGLE_CLIENT_ID,
            clientSecret: envs.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8081/api/session/google",
            },
            async (accessToken, refreshToken, profile, cb) => {
                try {
                    const { name, emails} = profile;
                    const user = await userRepository.getByEmail(emails[0].value);

                    if (user){
                        return cb(null, user);
                        
                    }else{
                        const newUser = {
                            firstName: name.givenName,
                            lastName: name.familyName,
                            email: emails[0].value,
                        };
                        const userCreate = await userRepository.create(newUser);
                        return cb(null, userCreate)
                    }
                } catch (error) {
                    return cb(error);
                }
            }
        )
    )
    //ESTRATEGIA JSON WEB TOKEN
    passport.use(
        "jwt",
        new JWTStrategy(

            {jwtFromRequest: ExtractJWT.fromExtractors([cookieExtrator]), secretOrKey: envs.JWT_SECRET_CODE},
            async(jwt_payload, done)=>{
                try {
                    console.log(jwt_payload)
                    return done(null, jwt_payload)
                } catch (error) {
                    return done(error);
                }
            }
        )
    )
    
    passport.use(
        "login",
        new LocalStrategy({usernameField:"email"}, async(username, password, done) => {
            try {
                const user = await userRepository.getByEmail(username);

                if(!user || !isValidPassword(user.password, password)) return done(null, false, {message: "User or email not found"});
                
                return done(null, user);

            } catch (error) {
                done(error);
            }
        })
    )

    //ESTRATEGIA CURRENT DE PASSPORT
    passport.use(
        "current",
        new CustomStrategy(
            async (req, done) => {
                try {
                    const token = cookieExtrator(req);
                    if(!token) return done(null, false);
                    const tokenVerify = verifyToken(token);
                    if(!tokenVerify) return done(null, false);
                    const user = await userRepository.getByEmail(tokenVerify.email)
                    done(null, user);
                } catch (error) {
                    done(error)
                }
            } 
        )
    )

    
    passport.serializeUser((user, done) => {

        done(null, user._id);
    });

    passport.deserializeUser(async(id, done) => {
        try {
            const user = await userRepository.getById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });

};