import { NOTIFICATIONS_COLLECTION } from "../../utils";

export const getNotifications = async (req, res, db) => {
  try {
    const notifications = await db.getCollection(NOTIFICATIONS_COLLECTION);

    const newNotifications = notifications.map((notification) => {
      const timestamp = new Date(notification?.createdAt?._seconds * 1000);

      return {
        ...notification,
        timestamp,
      };
    });

    return res.status(200).json({ notifications: newNotifications });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
