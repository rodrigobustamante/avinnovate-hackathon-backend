const weatherPrompt = ({ eventTitle, temperature, eventDate, eventLocation }) => {
  const textToUse = `
    El concierto ${eventTitle} que será en ${eventLocation} el ${eventDate} habrá una temperatura de ${temperature}°C.
  `

  const promptText = `
    Crea un objeto JSON válido con las siguientes propiedades:\n
    {\"title\": \"Título de la notificación\",\"description\": \"una descripción de la notificación de 20 caracteres\"}
    El contexto:\n
    ${textToUse}\n\n
    El objeto JSON:\n\n
    `;

  console.log('promptText: ', promptText);
  
  return promptText;
};

export default weatherPrompt;
