export const serializeFormData = (elements: HTMLFormElement) => {
    const formData = new FormData(elements);

    return Object.fromEntries(formData.entries());
}