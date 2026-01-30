export const fetchEvents = async () => {

    const res = await fetch("http://localhost:5000/events");
return res.json();
};