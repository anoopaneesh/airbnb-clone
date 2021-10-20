import '../utils/firebase'
import { auth } from '../utils/firebase';
import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, User } from '@firebase/auth';
import { FirebaseError } from '@firebase/util';
interface AuthProps{
    user:User | null,
    signInWithEmail:(email:string,password:string) => void,
    signOut:() => void,
    signInWithGoogle:()=>void,
    signInWithFacebook:()=>void
}
const AuthContext = createContext<AuthProps>({} as AuthProps)


const AuthProvider = ({children}:any) => {
    const [user,setUser] = useState<User | null>(null)
    const signInWithEmail = (email:string,password:string) => {
        return signInWithEmailAndPassword(auth,email,password).then((userCredentials)=>setUser(userCredentials.user)).catch((err:FirebaseError) => {
           if(err.code === 'auth/user-not-found'){
               createUserWithEmailAndPassword(auth,email,password).then(userCredentials => setUser(userCredentials.user))
           }
        })
    }
    const signInWithGoogle = () => {
        return signInWithPopup(auth,new GoogleAuthProvider()).then((userCredentials) => setUser(userCredentials.user))
    }
    const signInWithFacebook = () => {
        return signInWithPopup(auth,new FacebookAuthProvider()).then((userCredentials) => setUser(userCredentials.user))
    }
    const signOut = () => {
        auth.signOut()
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(newUser)=>{
            setUser(newUser)
        })
        return () => unsubscribe()
    },[])
    return <AuthContext.Provider value={{user,signInWithEmail,signOut,signInWithGoogle,signInWithFacebook}}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)