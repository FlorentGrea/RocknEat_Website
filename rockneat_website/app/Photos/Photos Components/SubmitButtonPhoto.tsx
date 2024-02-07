'use client'

import { useFormStatus } from "react-dom";
import { useEffect } from "react";

interface SubmitButtonPhotoProps {
    html: any
}

export default function SubmitButtonPhoto({ html }: SubmitButtonPhotoProps) {
    const { pending } = useFormStatus()

    useEffect (() => {
        const imageButtons = document.getElementsByClassName("photoPendingButton")
        for (let i = 0; imageButtons[i]; i++) {
            const button: any = imageButtons[i]
            button.disabled = pending
        }
    }, [pending])

    return (
        <button
            type="submit"
            disabled={pending}
            className="photoPendingButton disabled:animate-pulse w-fit align-middle shadow shadow-red-b bg-black"
        >
            {html}
        </button>
    )
}