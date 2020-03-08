export const loadStoreFromSessionStorage = () => {
    try {
        const serializedState = sessionStorage.getItem("persisted_data");
        let result = undefined;
        if (serializedState !== null) {
            result =  JSON.parse(serializedState);
        }
        return result;

    } catch (err) {
        return undefined;
    }
};

export const saveStoreToSessionStorage = (persistedState) => {
    const serializedState = JSON.stringify(persistedState);
    sessionStorage.setItem("persisted_data", serializedState);
};