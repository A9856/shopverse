export default function ImageValidator(e) {
    if (e.target.files.length === 1) {
        let file = e.target.files[0]
        if (!(file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/gif" || file.type === "image/png"))
            return "Invalid Pic. Please Upload .jpg .jpeg .png or .gif format"
        else if (file.size > 1048576)
            return "Pic size is too high. please upload an image upto 1 mb"
        else
            return ""
    }
    else {
        let errorMessage = []
        Array.from(e.target.files).forEach((file, index) => {
            if (!(file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/gif" || file.type === "image/png"))
                errorMessage.push(`Invalid Pic ${index + 1}, Please Upload .jpg .jpeg .png or .gif format`)
            else if (file.size > 1048576)
                errorMessage.push(`Pic${index + 1} size is too high. please upload an image upto 1 mb`)
        })
        return errorMessage.length === 0 ? "" : errorMessage.toString()
    }
}