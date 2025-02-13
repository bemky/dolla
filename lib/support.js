export function camelize(value, uppercaseFirstLetter=false) {
    if (uppercaseFirstLetter) {
        value = capitalize(value);
    } else {
        value = anticapitalize(value);
    }

    value = value.replace(/(_|-|(\/))([a-z\d]*)/g, (_a, _b, first, rest) => {
        return (first || '') + capitalize(rest);
    });

    return value.replace('/', '.');
}

export function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export function anticapitalize(value) {
    return value.charAt(0).toLowerCase() + value.slice(1);
}