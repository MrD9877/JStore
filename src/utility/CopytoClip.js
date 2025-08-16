"use client"
export default function CopytoClip(data, popTost) {
    navigator.clipboard.writeText(data)
    popTost("Copied ✔", true)
    return (<></>)
}
