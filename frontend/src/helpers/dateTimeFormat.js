const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    return new Intl.DateTimeFormat('en-US').format(date);
}

export { formatDate }