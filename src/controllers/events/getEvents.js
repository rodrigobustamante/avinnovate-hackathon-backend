import { EVENTS_COLLECTION } from '../../utils';

export const getEvents = async (req, res, db) => {
  try {
    const events = await db.getCollection(EVENTS_COLLECTION);

    return res.status(200).json({ events });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
