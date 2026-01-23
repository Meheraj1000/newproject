export function getTotalHoursFromInvestDay(date) {
    const givenDate = new Date(date);
    const now = new Date();

    const diffMs = now - givenDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    return diffHours;
}


export function getTotalDaysFromInvestDay(date) {
    const givenDate = new Date(date);
    const today = new Date();

    // সময় বাদ দিয়ে শুধু তারিখ নেব
    givenDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = today - givenDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays; 
}
