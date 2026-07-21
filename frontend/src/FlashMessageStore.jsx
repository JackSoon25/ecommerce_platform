import { atom, useAtom } from 'jotai';

const flashMessageAtom = atom({
    "message": "",
    // based on the Bootstrap Alert components
    "type": "info"
});

// create the hook
export const useFlashMessage = () => {

    // give the useFlashMessage the ability ot read and to update the atom
    const [flashMessage, setFlashMessage] = useAtom(flashMessageAtom);

    const showMessage = (message, type = "info") => {
        setFlashMessage({
            message, type
        });
        // after 3 seconds, call clearMessage automatically
        setTimeout(clearMessage, 6500);
    }

    const clearMessage = ()=>{
        setFlashMessage({
            "message":"",
            "type":"info"
        })
    }
    // whatever we return form a hook function can be used by
    // other React components
    return {
        showMessage,
        flashMessage
    };

};
