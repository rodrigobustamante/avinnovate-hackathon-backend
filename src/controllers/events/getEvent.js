import { EVENTS_COLLECTION } from '../../utils';

export const getEvent = async (req, res, db) => {
  const {
    params: { id },
  } = req;
  try {
    const event = await db.getDocument(EVENTS_COLLECTION, id);

    return res.status(200).json({ event });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
