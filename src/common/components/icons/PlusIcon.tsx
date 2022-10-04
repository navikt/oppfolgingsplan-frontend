import * as React from "react"

export const PlusIcon = (props: any) => (
    <svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11 13v8h2v-8h8v-2h-8V3h-2v8H3v2h8Z"
            fill="#0067c5"
        />
    </svg>
)

export default PlusIcon
