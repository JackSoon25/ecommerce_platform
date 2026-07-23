import { atom, useAtom } from 'jotai';

const getJWTFromStorage = () => {
    return localStorage.getItem('jwt') || null;
};

export const jwtAtom = atom(getJWTFromStorage());

export const useJWT = () => {
    const [jwt, setJwt] = useAtom(jwtAtom);

    const setJWT = (token) => {
        localStorage.setItem('jwt', token);
        setJwt(token);
    };

    const clearJWT = () => {
        localStorage.removeItem('jwt');
        setJwt(null);
    };

    return {jwt, setJWT, clearJWT};
}