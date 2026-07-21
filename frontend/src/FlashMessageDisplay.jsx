// import the FlashMessage
import { useFlashMessage } from "./FlashMessageStore";

export default function FlashMessageDisplay() {
    const { flashMessage } = useFlashMessage();

    return <>
        {
            // use && to show truefully message. if both are true, the value is the second one
            flashMessage.message && <div className={`flash alert alert-${flashMessage.type}`}>
                {flashMessage.message}
            </div>
        }

    </>
}