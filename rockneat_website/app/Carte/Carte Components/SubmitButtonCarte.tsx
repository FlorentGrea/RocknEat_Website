'use client'

import { useFormStatus } from "react-dom";
import { useEffect } from "react";

interface SubmitButtonCarteProps {
    html: any
}

export default function SubmitButtonCarte({ html }: SubmitButtonCarteProps) {
    const { pending } = useFormStatus()

    useEffect (() => {
        const imageButtons = document.getElementsByClassName("cartePendingButton")
        for (let i = 0; imageButtons[i]; i++) {
            const button: any = imageButtons[i]
            button.disabled = pending
        }
    }, [pending])

    return (
        <button
            type="submit"
            disabled={pending}
            className="cartePendingButton disabled:animate-pulse w-full flex justify-center align-middle"
        >
            {html}
        </button>
    )
}