module.exports = [
    {
        name: "rotate",
        description: "Rotate photo",
        args: {
            degress: "Amount of degress to rotate",
        },
    },
    {
        name: "resize",
        description: "Resize photo",
        args: {
            size: {
                width: "New width",
                height: "New height",
            },
        },
    },
    {
        name: "reformat",
        description: "Cheange format of photo",
        args: {
            format: "New format of photo (eg. png)",
        },
    },
    {
        name: "extract",
        description: "Crop photo",
        args: {
            crop: {
                width: "Width of crop",
                height: "Height of crop",
                left: "Move from left",
                top: "Move from top",
            },
        },
    },
    {
        name: "grayscale",
        description: "Turn photo in grayscale",
        args: {},
    },
    {
        name: "flip",
        description: "Flip photo",
        args: {},
    },
    {
        name: "flop",
        description: "Flop photo",
        args: {},
    },
    {
        name: "negate",
        description: "Negate photo",
        args: {},
    },
    {
        name: "tint",
        description: "Cheange tint of photo",
        args: {
            tint: {
                r: "cheange in red channel",
                g: "cheange in green channel",
                b: "cheange in blue channel",
            },
        },
    },
];
