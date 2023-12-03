import { NOTIFICATIONS_COLLECTION, EVENTS_COLLECTION } from "../../utils";
import weatherPrompt from '../../utils/prompts/weatherPrompt';
import { generateCompletion } from '../../utils/openAi';
import { formatFirestoreTimestamp } from '../../utils/helpers';

export const createWeatherNotifications = async (req, res, db) => {
  const { body } = req;

  if (!body?.eventId || !body?.temperature) {
    res.status(400).json({ message: 'Invalid body' });
  }

  try {
    const event = await db.getDocument(EVENTS_COLLECTION, body?.eventId)

    const prompt = weatherPrompt({
      eventTitle: `${event?.artist} - ${event?.description}`,
      temperature: body?.temperature,
      eventDate: formatFirestoreTimestamp(event?.date),
      eventLocation: event?.address
    });


    const response = await generateCompletion(prompt);

    const responseJSON = JSON.parse(response.choices[0].text);

    const notification = await db.addDocument(NOTIFICATIONS_COLLECTION, {
      eventId: body?.eventId,
      title: responseJSON.title,
      description: responseJSON.description,
      createdAt: new Date(),
      read: false,
    });

    res.status(201).json({ message: 'Notification created', notification });

  } catch (error) {
    console.log('Error in createWeatherNotifications: ', error);
    return res.status(500).json({ message: error });
  }
};
