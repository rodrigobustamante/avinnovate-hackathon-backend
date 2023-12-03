import { EVENTS_COLLECTION, isDateValid } from '../../utils';

export const createEvents = async (req, res, db) => {
  const { body } = req;

  if (
    !body?.artist ||
    !body?.date ||
    !body?.description ||
    !body?.imageUrl ||
    !body?.address
  ) {
    return res.status(400).json({ message: 'Invalid body' });
  }

  if (!isDateValid(body.date)) {
    return res.status(400).json({ message: 'Invalid event date' });
  }

  try {
    const event = await db.addDocument(EVENTS_COLLECTION, {
      ...body,
      date: new Date(body.date),
    });

    return res.status(201).json({ message: 'Event created', event });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
