const WEEKS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const getDayString = (obj: Date): string => {
    return WEEKS[obj.getDay()];
}

export const getDateString = (obj: Date): string => {
    const year = obj.getFullYear();
    const month = obj.getMonth();
    const date = obj.getDate();
    return `${MONTHS[month]} ${date}, ${year}`;
}

export const getMeridiemString = (obj: Date): string => {
    const hours = obj.getHours();

    return hours >= 12 ? 'PM' : 'AM'; 
}
