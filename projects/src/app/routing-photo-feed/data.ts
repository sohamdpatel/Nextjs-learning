export type Wonder = {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
}

export const Wonders: Wonder[] = [
  {
    id: 1,
    name: "Taj Mahal",
    location: "Agra, India",
    description: "A white marble mausoleum built by Shah Jahan in memory of his wife Mumtaz Mahal.",
    image: "https://images.unsplash.com/photo-1506462945848-ac8ea6f609cc?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D  ",
  },
  {
    id: 2,
    name: "Great Wall of China",
    location: "China",
    description: "A series of fortifications built to protect ancient China from invasions.",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D0",
  },
  {
    id: 3,
    name: "Petra",
    location: "Ma'an, Jordan",
    description: "An ancient city carved into pink sandstone cliffs, known as the Rose City.",
    image: "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Christ the Redeemer",
    location: "Rio de Janeiro, Brazil",
    description: "A massive statue of Jesus Christ atop Mount Corcovado, symbolizing peace.",
    image: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?q=80&w=1226&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    name: "Machu Picchu",
    location: "Cusco Region, Peru",
    description: "A 15th-century Inca citadel located in the Andes Mountains.",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    name: "Colosseum",
    location: "Rome, Italy",
    description: "A giant Roman amphitheatre used for gladiator contests and public events.",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    name: "Chichen Itza",
    location: "Yucatán, Mexico",
    description: "A complex of Mayan ruins known for the Temple of Kukulcán pyramid.",
    image: "https://images.unsplash.com/photo-1562657655-0b903655255a?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default Wonders;