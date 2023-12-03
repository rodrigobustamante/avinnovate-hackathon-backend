import { NOTIFICATIONS_COLLECTION } from "../../utils";

export const createNotifications = async (req, res, db) => {
  const { body } = req;

  if (!body?.eventId || !body?.title || !body?.description || !body?.eventId) {
    res.status(400).json({ message: 'Invalid body' });
  }

  try {
    const notification = await db.addDocument(NOTIFICATIONS_COLLECTION, {
      ...body,
      createdAt: new Date(),
      read: false,
    });

    return res.status(201).json({ message: 'Notification created', notification });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
