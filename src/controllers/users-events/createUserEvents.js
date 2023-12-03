import { USER_EVENTS_COLLECTION } from '../../utils';

export const createUserEvents = async (req, res, db) => {
  const { body } = req;

  if (!body?.userId || !body?.eventId || !body?.notifyUser) {
    res.status(400).json({ message: 'Invalid body' });
  }

  try {
    const userEvents = await db.addDocument(USER_EVENTS_COLLECTION, {
      ...body,
    });

    return res.status(201).json({ message: 'User events created', userEvents });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
